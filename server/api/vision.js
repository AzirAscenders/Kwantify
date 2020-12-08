const router = require('express').Router()
const {Item} = require('../db/models')
const {starbucksReceiptReader, visionReader} = require('./receipt-parsing')

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const detections = await visionReader(req, res)
    let itemsToCreate = await starbucksReceiptReader(detections)
    const items = await Item.bulkCreate(itemsToCreate, {returning: true})
    res.json(items)
  } catch (err) {
    next(err)
  }
})
