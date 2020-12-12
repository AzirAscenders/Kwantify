const router = require('express').Router()
const {Item} = require('../db/models')

module.exports = router
router.post('/', async (req, res, next) => {
  try {
    const itemsToCreate = req.body.items
    const transactionId = req.body.transactionId
    const items = await Item.bulkCreate(itemsToCreate, {returning: true})

    items.forEach(item => {
      item.setTransaction(transactionId)
    })
    res.json(items)
  } catch (err) {
    next(err)
  }
})
