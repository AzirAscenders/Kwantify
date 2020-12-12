const router = require('express').Router()
const {Transaction} = require('../db/models')
const {Item} = require('../db/models')
const {starbucksReceiptReader, visionReader} = require('./receipt-parsing')

module.exports = router

router.get('/:transId', async (req, res, next) => {
  try {
    const transaction = await Transaction.findOne({
      where: {id: req.params.transId}
    })
    const items = await Item.findAll({
      where: {transactionId: req.params.transId}
    })

    if (!transaction) {
      return res.sendStatus(404)
    }

    if (transaction.userId !== req.user.dataValues.id) {
      return res.sendStatus(401)
    }

    res.json([transaction, items])
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

// POST ROUTE FOR PICTURE RECEIPT //
router.post('/', async (req, res, next) => {
  try {
    const detections = await visionReader(req, res)
    let itemsToCreate = await starbucksReceiptReader(detections)
    let transaction = await Transaction.create(itemsToCreate[0])

    transaction.setUser(req.user.dataValues.id)

    const items = await Item.bulkCreate(itemsToCreate[1], {returning: true})
    items.forEach(item => {
      item.setTransaction(transaction.dataValues.id)
    })
    res.json([transaction, items])
  } catch (err) {
    next(err)
  }
})

// POST ROUTE FOR MANUALLY ADDING //
router.post('/add', async (req, res, next) => {
  try {
    const info = {
      name: req.body.name,
      amount: req.body.amount,
      date: req.body.date,
      category: req.body.category
    }
    const newTransaction = await Transaction.create(info)
    newTransaction.setUser(req.user.dataValues.id)
    res.json(newTransaction)
  } catch (error) {
    next(error)
  }
})
