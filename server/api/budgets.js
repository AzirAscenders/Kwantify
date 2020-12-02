const router = require('express').Router()
const {Budget} = require('../db/models')
module.exports = router

router.put('/', async (req, res, next) => {
  try {
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
    res.json(update)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
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
    } = budget.dataValues

    res.json({
      totalSpending,
      foodAndDrink,
      travel,
      entertainment,
      healthcare,
      shopping,
      groceries
    })
  } catch (err) {
    next(err)
  }
})
