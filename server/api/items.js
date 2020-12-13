const router = require('express').Router()
const {Item, Transaction} = require('../db/models')

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

router.put('/', async (req, res, next) => {
  try {
    const updated = []
    const items = req.body

    await Promise.all(
      items.map(async item => {
        const transaction = await Transaction.findByPk(item.transactionId)

        if (transaction.dataValues.userId === req.user.dataValues.id) {
          if (!item.delete) {
            item.price = +item.price * 100
            const update = await Item.update(item, {
              where: {id: item.id},
              returning: true,
              plain: true
            })
            updated.push(update[1].dataValues)
          } else {
            await Item.destroy({where: {id: item.id}})
          }
        } else {
          return res.sendStatus(401)
        }
      })
    )

    res.send(updated.sort((a, b) => a.id - b.id))
  } catch (err) {
    next(err)
  }
})

// router.delete('/', async (req, res, next) => {
//   try {
//     const transaction = await Transaction.findByPk(req.body.transactionId)

//     if (transaction.dataValues.userId === req.user.dataValues.id) {
//       await Item.destroy({where: {id: req.body.id}})
//       return res.sendStatus(202)
//     } else {
//       return res.sendStatus(401)
//     }
//   } catch (err) {
//     next(err)
//   }
// })
