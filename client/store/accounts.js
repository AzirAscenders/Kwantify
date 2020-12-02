import axios from 'axios'

//ACTION TYPES
const GET_ALL_ACCOUNTS = 'GET_ALL_ACCOUNTS'

//INITIAL STATE
const initialState = []

//ACTION CREATORS
const getAllAccounts = accounts => ({
  type: GET_ALL_ACCOUNTS,
  accounts
})

//THUNK
export const fetchAllAccounts = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/accounts/${userId}`)
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
      return action.accounts
    default:
      return state
  }
}

export default accountsReducer
