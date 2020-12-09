const router = require('express').Router()
const {User, Account, Institution, Transaction} = require('../db/models')
const plaid = require('plaid')
const {CLIENT_ID, SECRET} = require('../../secrets')
const moment = require('moment')
const sequelize = require('sequelize')
// const cron = require('node-cron')

module.exports = router

const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID || CLIENT_ID,
  secret: process.env.PLAID_SECRET || SECRET,
  env: plaid.environments.sandbox
})

// call plaid /transaction/get every ___ hours (Tier 2)
// cron.schedule('*/5 * * * * *', async () => {
//   const users = await User.findAll()
//   users.map(async (user) => {
//     if (user.accessToken) {
//       const today = moment().format('YYYY-MM-DD')
//       const past = moment().subtract(5, 'days').format('YYYY-MM-DD')
//       const response = await client
//         .getTransactions(user.accessToken, past, today, {})
//         .catch((err) => {
//           console.log(err)
//         })
//       const transactions = response.transactions
//       console.log(transactions)
//     }
//   })
// })

router.post('/get_link_token', async (req, res, next) => {
  try {
    // Get the client_user_id by searching for the current user
    const user = await User.findByPk(req.user.dataValues.id)
    const clientUserId = user.id

    const tokenResponse = await client.createLinkToken({
      user: {
        client_user_id: `${clientUserId}`
      },
      client_name: 'Kwantify',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en'
    })
    res.json({link_token: tokenResponse.link_token})
  } catch (err) {
    // Display error on client
    next(err)
  }
})

router.post('/get_access_token', (req, res, next) => {
  const {public_token, userId, metadata} = req.body

  client.exchangePublicToken(public_token, async (err, tokenRes) => {
    if (err) {
      const msg = 'Could not exchange public_token!'
      console.log(msg + '\n' + JSON.stringify(err))
      return res.json({
        error: msg
      })
    }

    const {access_token, item_id} = tokenRes
    // we need institutionId and userId to check in accounts model if the account exsits or not
    // if it exists update only the access token
    // if it doesn't create new account inside the accounts model assigned to that user
    // const user = await User.findByPk(userId)
    console.log(metadata)

    let dbInstitution = await Institution.findOne({
      where: {institutionId: metadata.institution.institution_id}
    })

    if (!dbInstitution) {
      dbInstitution = await Institution.create({
        institutionId: metadata.institution.institution_id,
        institutionName: metadata.institution.name
      })
    }

    metadata.accounts.map(async account => {
      let dbAccount = await Account.findOne({
        where: {userId, institutionId: dbInstitution.id}
      })

      if (dbAccount) {
        await dbInstitution.update({accessToken: access_token, itemId: item_id})
      } else {
        dbAccount = await Account.create({
          name: account.name,
          accountId: account.id,
          accessToken: access_token,
          itemId: item_id
        })

        dbAccount.setUser(userId)
        dbAccount.setInstitution(dbInstitution.id)
      }
    })
    res.json(access_token)
  })
})

router.get('/transactions/get', async (req, res, next) => {
  try {
    // const accessTokens = await Account.findOne({
    //   where: {userId: req.user.dataValues.id},
    //   include: {model: Institution}
    // })

    const accessTokens = await Account.findAll({
      where: {userId: req.user.dataValues.id},
      attributes: ['accessToken', sequelize.fn('COUNT', sequelize.col('id'))],
      group: ['accessToken']
    })

    const accounts = await Account.findAll({
      where: {
        userId: req.user.dataValues.id
      }
    })

    const accountIds = accounts.map(account => account.dataValues.accountId)

    const today = moment().format('YYYY-MM-DD')
    const past = moment()
      .subtract(90, 'days')
      .format('YYYY-MM-DD')

    let transactions = []

    await Promise.all(
      accessTokens.map(async token => {
        const response = await client
          .getTransactions(token.dataValues.accessToken, past, today, {})
          .catch(err => {
            console.log(err)
          })

        transactions.push(response.transactions)
      })
    )
    let combinedTransactions = []

    transactions
      .map(bank => {
        return bank.filter(
          transaction =>
            (transaction.category[0] === 'Transfer' &&
              transaction.category[1] === 'Debit') ||
            (transaction.category[0] === 'Payment' &&
              transaction.category[1] !== 'Credit Card') ||
            transaction.category[0] === 'Shops' ||
            transaction.category[0] === 'Food and Drink' ||
            transaction.category[0] === 'Travel' ||
            transaction.category[0] === 'Recreation'
        )
      })
      .map(bank => combinedTransactions.push(...bank))

    combinedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))

    combinedTransactions = combinedTransactions.filter(transaction => {
      if (accountIds.includes(transaction.account_id)) return transaction
    })

    combinedTransactions = await Promise.all(
      combinedTransactions.map(async transaction => {
        transaction.category = transaction.category[0]
        try {
          const found = await Transaction.findOne({
            where: {transaction_id: transaction.transaction_id}
          })

          if (!found) {
            const dbTransaction = await Transaction.create({
              name: transaction.name,
              date: transaction.date,
              amount: +transaction.amount,
              category: transaction.category,
              account_id: transaction.account_id,
              transaction_id: transaction.transaction_id
            })
            transaction.id = dbTransaction.dataValues.id
            await dbTransaction.setUser(req.user.dataValues.id)
          } else {
            transaction.id = found.dataValues.id
          }
          return transaction
        } catch (err) {
          console.log(err)
        }
      })
    )
    res.json(combinedTransactions)
  } catch (err) {
    next(err)
  }
})
