const router = require('express').Router()
module.exports = router

router.use('/accounts', require('./accounts'))
router.use('/budgets', require('./budgets'))
router.use('/plaid', require('./plaid'))
router.use('/transactions', require('./transactions'))
router.use('/users', require('./users'))
router.use('/items', require('./items'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
