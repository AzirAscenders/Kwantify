const router = require('express').Router()
const {Account, Institution} = require('../db/models')

module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    console.log('REQ BODY', req.body)
    const allAccounts = await Account.findAll({
      where: {
        userId: req.params.userId
      },
      include: {
        model: Institution
      }
    })
    res.json(allAccounts)
  } catch (error) {
    next(error)
  }
})
