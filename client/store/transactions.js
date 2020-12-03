/* eslint-disable complexity */
import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'

/**
 * INITIAL STATE
 */
const defaultTransactions = []

/**
 * ACTION CREATORS
 */
const getTransactions = transactions => ({
  type: GET_TRANSACTIONS,
  transactions
})

/**
 * THUNK CREATORS
 */
export const fetchTransactions = () => async dispatch => {
  try {
    const res = await axios.get('/api/plaid/transactions/get')
    dispatch(getTransactions(res.data || defaultTransactions))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultTransactions, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.transactions.map(bank => {
        return bank.filter(
          transaction =>
            (transaction.category[0] === 'Transfer' &&
              transaction.category[1] === 'Debit') ||
            (transaction.category[0] === 'Payment' &&
              transaction.category[1] !== 'Credit Card') ||
            transaction.category[0] === 'Shops' ||
            transaction.category[0] === 'Food and Drink' ||
            transaction.category[0] === 'Travel' ||
            transaction.category[0] === 'Recreation'
        )
      })

    default:
      return state
  }
}
