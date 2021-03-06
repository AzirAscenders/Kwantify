/* eslint-disable complexity */
import axios from 'axios'
import {REMOVE_USER} from './user'

/**
 * ACTION TYPES
 */
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
const GET_ITEMS = 'GET_ITEMS'
const CURRENT_MONTH_TRANSACTIONS = 'CURRENT_MONTH_TRANSACTIONS'
const LAST_MONTH_TRANSACTIONS = 'LAST_MONTH_TRANSACTIONS'
const TWO_MONTHS_BEFORE_TRANSACTIONS = 'TWO_MONTHS_BEFORE_TRANSACTIONS'
const ADD_TRANSACTIONS = 'ADD_TRANSACTIONS'
const ADD_ITEMS = 'ADD_ITEMS'
const SELECTED = 'SELECTED'
const FILTERED = 'FILTERED'
const GET_SINGLE_TRANSACTION = 'GET_SINGLE_TRANSACTION'
const EDIT_TRANSACTION = 'EDIT_TRANSACTION'
const EDIT_ITEMS = 'EDIT_ITEMS'
const SINGLE_TRANSACTION_LOADING = 'SINGLE_TRANSACTION_LOADING'

/**
 * INITIAL STATE
 */
const defaultTransactions = {
  items: [],
  transactions: [],
  currentMonth: [],
  lastMonth: [],
  twoMonthsBefore: [],
  selected: [],
  filtered: [],
  singleTransaction: {},
  loading: true
}

/**
 * ACTION CREATORS
 */
const getTransactions = transactions => ({
  type: GET_TRANSACTIONS,
  transactions
})

const getItems = items => ({
  type: GET_ITEMS,
  items
})

const getSingleTransaction = transaction => ({
  type: GET_SINGLE_TRANSACTION,
  transaction
})

const editTransaction = transaction => ({
  type: EDIT_TRANSACTION,
  transaction
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

export const filtered = transactions => ({
  type: FILTERED,
  transactions
})

export const addTransactions = transactions => ({
  type: ADD_TRANSACTIONS,
  transactions
})

export const addItems = items => ({
  type: ADD_ITEMS,
  items
})

const editItems = items => ({
  type: EDIT_ITEMS,
  items
})

export const singleTransLoad = () => ({
  type: SINGLE_TRANSACTION_LOADING
})

/**
 * THUNK CREATORS
 */
export const fetchTransactions = () => async dispatch => {
  try {
    const res = await axios.get('/api/plaid/transactions/get')
    await dispatch(getTransactions(res.data || defaultTransactions))
    await dispatch(selected(res.data || defaultTransactions))
    await dispatch(filtered(res.data || defaultTransactions))
    await dispatch(currentMonthTransactions(res.data || defaultTransactions))
    await dispatch(lastMonthTransactions(res.data || defaultTransactions))
    await dispatch(twoMonthsBeforeTransactions(res.data || defaultTransactions))
  } catch (err) {
    console.error(err)
  }
}

export const addTransactionsThunk = newTransaction => async dispatch => {
  try {
    const res = await axios.post('/api/transactions/add', newTransaction)
    console.log(res.data)
    dispatch(addTransactions(res.data))
  } catch (err) {
    console.error('Unable to add transactions', err)
  }
}

export const addItemThunk = (items, transactionId) => async dispatch => {
  try {
    const res = await axios.post('/api/items', {items, transactionId})
    dispatch(addItems(res.data))
  } catch (err) {
    console.error('Unable to add items', err)
  }
}

export const addReceiptTransaction = formData => async dispatch => {
  try {
    const res = await axios.post('/api/transactions', formData)
    await dispatch(addTransactions(res.data[0]))
  } catch (err) {
    console.log('Unable to add receipt transaction', err)
  }
}

export const fetchSingleTransaction = transId => async dispatch => {
  try {
    const res = await axios.get(`/api/transactions/${transId}`)
    await dispatch(getSingleTransaction(res.data[0]))
    await dispatch(getItems(res.data[1].sort((a, b) => a.id - b.id)))
  } catch (err) {
    console.error('Fetch Single Transactions ERROR', err)
  }
}

export const updateTransaction = update => async dispatch => {
  try {
    const {data: updated} = await axios.put('/api/transactions/', update)
    dispatch(editTransaction(updated))
  } catch (err) {
    console.error(err)
  }
}

export const editTransactionItems = items => async dispatch => {
  try {
    const res = await axios.put('/api/items', items)
    console.log(res.data)
    dispatch(editItems(res.data))
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

    case GET_SINGLE_TRANSACTION:
      action.transaction.amount = (action.transaction.amount / 100).toFixed(2)
      return {
        ...state,
        singleTransaction: action.transaction,
        singleTransLoading: false
      }

    case CURRENT_MONTH_TRANSACTIONS:
      if (action.transactions.length) {
        currMonth = action.transactions[0].date.split('-')[1]
        return {
          ...state,
          currentMonth: action.transactions.filter(
            element => element.date[5] + element.date[6] === currMonth
          )
        }
      } else {
        return {
          ...state
        }
      }

    case LAST_MONTH_TRANSACTIONS:
      if (action.transactions.length) {
        lastMonth = String(
          Number(action.transactions[0].date.split('-')[1] - 1)
        )
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
      } else {
        return {
          ...state
        }
      }
    case TWO_MONTHS_BEFORE_TRANSACTIONS:
      if (action.transactions.length) {
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
      } else {
        return {
          ...state
        }
      }
    case ADD_TRANSACTIONS:
      return {
        ...state,
        transactions: [...state.transactions, action.transactions],
        loading: true
      }

    // case ADD_ITEMS:
    //   return {
    //     ...state,
    //     items: [...state.items, ...action.items],
    //   }

    case GET_ITEMS:
      return {
        ...state,
        items: action.items
      }

    case ADD_ITEMS:
      return {
        ...state,
        items: [...state.items, ...action.items],
        loading: true
      }

    case SELECTED:
      return {
        ...state,
        selected: action.transactions
      }

    case FILTERED:
      return {
        ...state,
        filtered: action.transactions,
        loading: false
      }

    case EDIT_TRANSACTION:
      action.transaction.amount = (action.transaction.amount / 100).toFixed(2)
      return {...state, singleTransaction: action.transaction}

    case EDIT_ITEMS:
      return {...state, items: action.items}

    case SINGLE_TRANSACTION_LOADING:
      return {...state, singleTransaction: {}}

    case REMOVE_USER:
      return defaultTransactions

    default:
      return state
  }
}
