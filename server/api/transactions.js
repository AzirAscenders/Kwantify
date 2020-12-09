const router = require('express').Router()
const {Transaction} = require('../db/models')

module.exports = router

router.get('/:transId', async (req, res, next) => {
  try {
    const transaction = await Transaction.findOne({
      where: {id: req.params.transId}
    })

    if (!transaction) {
      return res.sendStatus(404)
    }

    if (transaction.userId !== req.user.dataValues.id) {
      return res.sendStatus(401)
    }

    res.json(transaction)
  } catch (err) {
    next(err)
  }
})

router.put('/:transId', async (req, res, next) => {
  try {
    const transaction = await Transaction.findOne({
      where: {id: req.params.transId}
    })

    if (transaction.userId !== req.user.dataValues.id) {
      return res.sendStatus(401)
    }

    const info = {
      name: req.body.name,
      amount: req.body.amount,
      date: req.body.date,
      category: req.body.category
    }

    const updated = await transaction.update(info)

    res.json(updated)
  } catch (err) {
    next(err)
  }
})
