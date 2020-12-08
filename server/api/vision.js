const router = require('express').Router()
const {Item} = require('../db/models')
const starbucksReceiptReader = require('./receipt-parsing')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    let itemsToCreate = await starbucksReceiptReader()
    const items = await Item.bulkCreate(itemsToCreate, {returning: true})
    res.json(items)
  } catch (err) {
    next(err)
  }
})
