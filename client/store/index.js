import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import link from './link'
import linkTransactions from './link-transactions'
import budgets from './budgets'
import accounts from './accounts'
import transactions from './transactions'

const reducer = combineReducers({
  user,
  link,
  linkTransactions,
  accounts,
  budgets,
  transactions
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
