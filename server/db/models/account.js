const Sequelize = require('sequelize')
const db = require('../db')

const Account = db.define('account', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  account_id: {
    type: Sequelize.STRING,
    allowNull: false
  },
  current_balance: {
    type: Sequelize.INTEGER
  },
  accessToken: {
    type: Sequelize.TEXT
  },
  itemId: {
    type: Sequelize.TEXT
  }
})

Account.beforeCreate(account => {
  account.current_balance = Math.round(+account.current_balance * 100)
})

module.exports = Account
