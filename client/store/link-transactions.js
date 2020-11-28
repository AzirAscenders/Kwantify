import axios from 'axios'

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
  userId
) => async dispatch => {
  try {
    const res = await axios.post('/api/plaid/get_access_token', {
      public_token,
      userId
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
    default:
      return state
  }
}
