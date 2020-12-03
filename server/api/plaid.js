const router = require('express').Router()
const {User, Account, Institution} = require('../db/models')
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
    // console.log('XXXX', transactions)

    // const response = await client.getTransactions(
    //   accessTokens[0].dataValues.accessToken,
    //   past,
    //   today,
    //   {}
    // )

    res.json(transactions)
  } catch (err) {
    next(err)
  }
})
