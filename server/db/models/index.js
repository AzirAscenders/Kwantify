const User = require('./user')
const Transaction = require('./transaction')
const Item = require('./item')
const Budget = require('./budget')
const Account = require('./account')
const Institution = require('./institution')

// Associations //
User.hasMany(Transaction)
Transaction.belongsTo(User)

Transaction.hasMany(Item)
Item.belongsTo(Transaction)

User.hasOne(Budget)
Budget.belongsTo(User)

User.hasMany(Account)
Account.belongsTo(User)

Institution.hasMany(Account)
Account.belongsTo(Institution)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Transaction,
  Item,
  Budget,
  Account,
  Institution
}
