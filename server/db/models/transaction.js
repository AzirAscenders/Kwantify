const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  date: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING
  }
})

Transaction.beforeCreate(transaction => {
  transaction.amount = Math.round(+transaction.price * 100)
})

module.exports = Transaction
