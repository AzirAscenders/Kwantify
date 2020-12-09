const router = require('express').Router()
const {Item} = require('../db/models')
const {Transaction} = require('../db/models')
const {starbucksReceiptReader, visionReader} = require('./receipt-parsing')
// const multer = require('multer')
// const {storage, fileFilter, resizeImage} = require('./multerLogic')

module.exports = router

router.post('/addTransaction', async (req, res, next) => {
  try {
    const newTransaction = await Transaction.create(req.body)
    res.json(newTransaction)
  } catch (error) {
    next(error)
  }
})

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
