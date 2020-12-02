const router = require('express').Router()
const {Budget} = require('../db/models')
module.exports = router

router.put('/', async (req, res, next) => {
  const budget = await Budget.findOne({
    where: {userId: req.user.dataValues.id}
  })
  const {
    totalSpending,
    foodAndDrink,
    travel,
    entertainment,
    healthcare,
    shopping,
    groceries
  } = req.body

  const update = await budget.update({
    totalSpending,
    foodAndDrink,
    travel,
    entertainment,
    healthcare,
    shopping,
    groceries
  })
  console.log(update)
  res.json(update)
  // res.sendStatus()
})
