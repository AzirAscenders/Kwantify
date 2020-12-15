import axios from 'axios'
import {REMOVE_USER} from './user'

/**
 * ACTION TYPES
 */
const LINK_TRANSACTIONS = 'LINK_TRANSACTIONS'

/**
 * INITIAL STATE
 */
const defaultLinkTransactions = {}

/**
 * ACTION CREATORS
 */
const linkTransactions = transactions => ({
  type: LINK_TRANSACTIONS,
  transactions
})

/**
 * THUNK CREATORS
 */
export const generateLinkTransactions = (
  public_token,
  userId,
  metadata
) => async dispatch => {
  try {
    const res = await axios.post('/api/plaid/get_access_token', {
      public_token,
      userId,
      metadata
    })
    dispatch(linkTransactions(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultLinkTransactions, action) {
  switch (action.type) {
    case LINK_TRANSACTIONS:
      return action.transactions

    case REMOVE_USER:
      return defaultLinkTransactions

    default:
      return state
  }
}
