const router = require('express').Router()
const {User} = require('../db/models')
const plaid = require('plaid')
const {CLIENT_ID, SECRET} = require('../../secrets')
const moment = require('moment')

module.exports = router

const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID || CLIENT_ID,
  secret: process.env.PLAID_SECRET || SECRET,
  env: plaid.environments.sandbox
})

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
  const {public_token, userId} = req.body

  client.exchangePublicToken(public_token, async (err, tokenRes) => {
    if (err) {
      const msg = 'Could not exchange public_token!'
      console.log(msg + '\n' + JSON.stringify(err))
      return res.json({
        error: msg
      })
    }

    console.log(tokenRes)

    const {access_token, item_id} = tokenRes

    const user = await User.findByPk(userId)
    await user.update({accessToken: access_token, itemId: item_id})
    res.json(access_token)
  })
})

router.get('/transactions/get', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.dataValues.id)
    const today = moment().format('YYYY-MM-DD')
    const past = moment()
      .subtract(90, 'days')
      .format('YYYY-MM-DD')
    const response = await client
      .getTransactions(user.accessToken, past, today, {})
      .catch(err => {
        console.log(err)
      })
    const transactions = response.transactions
    res.json(transactions)
  } catch (err) {
    next(err)
  }
})
