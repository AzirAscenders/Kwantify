const Sequelize = require('sequelize')
const db = require('../db')

const Budget = db.define('budget', {
  totalSpending: {
    type: Sequelize.INTEGER
  },
  foodAndDrink: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  travel: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  entertainment: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  healthcare: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  shopping: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  groceries: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
  // Education //
  // Bills and Utilities //
})

module.exports = Budget
