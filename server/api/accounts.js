const router = require('express').Router()
const {Account, Institution} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allAccounts = await Account.findAll({
      where: {
        userId: req.user.dataValues.id
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
