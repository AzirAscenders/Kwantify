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
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING
  },
  account_id: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  transaction_id: {
    type: Sequelize.TEXT,
    allowNull: true
  }
})

Transaction.beforeCreate(transaction => {
  transaction.amount = Math.round(+transaction.amount * 100)
})

Transaction.beforeUpdate(transaction => {
  transaction.amount = Math.round(+transaction.amount * 100)
})

Transaction.beforeBulkCreate(transactions => {
  transactions.forEach(transaction => {
    transaction.amount = Math.round(+transaction.amount * 100)
  })
})

module.exports = Transaction
