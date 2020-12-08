const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/plaid', require('./plaid'))
router.use('/budgets', require('./budgets'))
router.use('/accounts', require('./accounts'))
router.use('/vision', require('./vision'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
