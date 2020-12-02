const Sequelize = require('sequelize')
const db = require('../db')

const Institution = db.define('institution', {
  institutionId: {
    type: Sequelize.STRING
  },
  institutionName: {
    type: Sequelize.STRING
  }
})

module.exports = Institution
