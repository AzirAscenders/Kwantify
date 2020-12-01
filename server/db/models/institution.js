const Sequelize = require('sequelize')
const db = require('../db')

const Institution = db.define('institution', {
  institutionId: {
    type: Sequelize.STRING
  },
  institutionName: {
    type: Sequelize.STRING
  },
  accessToken: {
    type: Sequelize.TEXT
  },
  itemId: {
    type: Sequelize.TEXT
  }
})

module.exports = Institution
