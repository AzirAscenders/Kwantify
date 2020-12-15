import axios from 'axios'
import history from '../history'
// import {fetchBudget} from './budgets'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const EDIT_USER = 'EDIT_USER'
export const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const editUser = user => ({type: EDIT_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (userInfo, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, userInfo)
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    // dispatch(fetchBudget())
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}
export const thunkEditUser = changedState => {
  return async dispatch => {
    try {
      const updatedUser = await axios.put('/api/users', changedState)
      dispatch(editUser(updatedUser.data))
    } catch (err) {
      console.error('Something went wrong with updating user info', err)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case EDIT_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
