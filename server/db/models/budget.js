const Sequelize = require('sequelize')
const db = require('../db')

const Budget = db.define('budget', {
  totalSpending: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  foodAndDrink: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  travel: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  entertainment: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  healthcare: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  shopping: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  groceries: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
  // Education //
  // Bills and Utilities //
})

Budget.beforeCreate(budget => {
  budget.totalSpending = Math.round(+budget.totalSpending * 100)
  budget.foodAndDrink = Math.round(+budget.foodAndDrink * 100)
  budget.travel = Math.round(+budget.travel * 100)
  budget.entertainment = Math.round(+budget.entertainment * 100)
  budget.healthcare = Math.round(+budget.healthcare * 100)
  budget.shopping = Math.round(+budget.shopping * 100)
  budget.groceries = Math.round(+budget.groceries * 100)
})

Budget.beforeUpdate(budget => {
  budget.totalSpending = Math.round(+budget.totalSpending * 100)
  budget.foodAndDrink = Math.round(+budget.foodAndDrink * 100)
  budget.travel = Math.round(+budget.travel * 100)
  budget.entertainment = Math.round(+budget.entertainment * 100)
  budget.healthcare = Math.round(+budget.healthcare * 100)
  budget.shopping = Math.round(+budget.shopping * 100)
  budget.groceries = Math.round(+budget.groceries * 100)
})

module.exports = Budget
