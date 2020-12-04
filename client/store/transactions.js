/* eslint-disable complexity */
import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
const CURRENT_MONTH_TRANSACTIONS = 'CURRENT_MONTH_TRANSACTIONS'
const LAST_MONTH_TRANSACTIONS = 'LAST_MONTH_TRANSACTIONS'
const TWO_MONTHS_BEFORE_TRANSACTIONS = 'TWO_MONTHS_BEFORE_TRANSACTIONS'
const SELECTED = 'SELECTED'

/**
 * INITIAL STATE
 */
const defaultTransactions = {
  transactions: [],
  currentMonth: [],
  lastMonth: [],
  twoMonthsBefore: [],
  selected: []
}

/**
 * ACTION CREATORS
 */
const getTransactions = transactions => ({
  type: GET_TRANSACTIONS,
  transactions
})

const currentMonthTransactions = transactions => ({
  type: CURRENT_MONTH_TRANSACTIONS,
  transactions
})
const lastMonthTransactions = transactions => ({
  type: LAST_MONTH_TRANSACTIONS,
  transactions
})
const twoMonthsBeforeTransactions = transactions => ({
  type: TWO_MONTHS_BEFORE_TRANSACTIONS,
  transactions
})
export const selected = transactions => ({
  type: SELECTED,
  transactions
})

/**
 * THUNK CREATORS
 */
export const fetchTransactions = () => async dispatch => {
  try {
    const res = await axios.get('/api/plaid/transactions/get')
    await dispatch(getTransactions(res.data || defaultTransactions))
    await dispatch(selected(res.data || defaultTransactions))
    await dispatch(currentMonthTransactions(res.data || defaultTransactions))
    await dispatch(lastMonthTransactions(res.data || defaultTransactions))
    await dispatch(twoMonthsBeforeTransactions(res.data || defaultTransactions))
  } catch (err) {
    console.error(err)
  }
}

let currMonth
let lastMonth
let twoMonthsBefore
/**
 * REDUCER
 */
export default function(state = defaultTransactions, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {...state, transactions: action.transactions}
    case CURRENT_MONTH_TRANSACTIONS:
      currMonth = action.transactions[0].date.split('-')[1]
      return {
        ...state,
        currentMonth: action.transactions.filter(
          element => element.date[5] + element.date[6] === currMonth
        )
      }
    case LAST_MONTH_TRANSACTIONS:
      lastMonth = String(Number(action.transactions[0].date.split('-')[1] - 1))
      if (lastMonth === '0') {
        lastMonth = '12'
      } else if (lastMonth.length === 1) {
        lastMonth = '0' + lastMonth
      }
      return {
        ...state,
        lastMonth: action.transactions.filter(
          element => element.date[5] + element.date[6] === lastMonth
        )
      }
    case TWO_MONTHS_BEFORE_TRANSACTIONS:
      twoMonthsBefore = String(
        Number(action.transactions[0].date.split('-')[1] - 2)
      )
      if (twoMonthsBefore === '0') {
        twoMonthsBefore = '12'
      } else if (twoMonthsBefore === '-1') {
        twoMonthsBefore = '11'
      } else if (twoMonthsBefore.length === 1) {
        twoMonthsBefore = '0' + twoMonthsBefore
      }
      return {
        ...state,
        twoMonthsBefore: action.transactions.filter(
          element => element.date[5] + element.date[6] === twoMonthsBefore
        )
      }
    case SELECTED:
      return {...state, selected: action.transactions}
    default:
      return state
  }
}
