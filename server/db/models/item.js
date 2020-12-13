const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER
  }
})

Item.beforeCreate(item => {
  console.log(item)
  item.price = Math.round(+item.price * 100)
})

// Item.beforeUpdate((item) => {
//   console.log(item)
//   item.price = Math.round(+item.price * 100)
// })

Item.beforeBulkCreate(items => {
  items.forEach(item => {
    item.price = Math.round(+item.price * 100)
  })
})

module.exports = Item
