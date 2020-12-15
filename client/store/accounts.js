import axios from 'axios'

//ACTION TYPES
const GET_ALL_ACCOUNTS = 'GET_ALL_ACCOUNTS'
const LOAD_ACCOUNTS = 'LOAD_ACCOUNTS'

//INITIAL STATE
const initialState = {accounts: [], loading: true}

//ACTION CREATORS
const getAllAccounts = accounts => ({
  type: GET_ALL_ACCOUNTS,
  accounts
})

export const loadAccounts = () => ({
  type: LOAD_ACCOUNTS
})

//THUNK
export const fetchAllAccounts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/accounts/`)
      dispatch(getAllAccounts(data))
    } catch (error) {
      console.error('Fetch All Accounts Error')
    }
  }
}

//REDUCER
const accountsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ACCOUNTS:
      return {...state, accounts: action.accounts, loading: false}

    case LOAD_ACCOUNTS:
      return {...state, loading: true}

    default:
      return state
  }
}

export default accountsReducer
