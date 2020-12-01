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
  accountId: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  currentBalance: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  accessToken: {
    type: Sequelize.TEXT
  },
  itemId: {
    type: Sequelize.TEXT
  },
  // We can think about if we want to create another model for institution in the upcoming tiers
  institutionId: {
    type: Sequelize.STRING
  },
  institutionName: {
    type: Sequelize.STRING
  }
})

Account.beforeCreate(account => {
  if (account.currentBalance)
    account.currentBalance = Math.round(+account.currentBalance * 100)
})

module.exports = Account
