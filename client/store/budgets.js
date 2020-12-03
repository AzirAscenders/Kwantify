import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_BUDGET = 'GET_BUDGET'
const UPDATE_BUDGET = 'UPDATE_BUDGET'

/**
 * INITIAL STATE
 */
const defaultBudget = {}

/**
 * ACTION CREATORS
 */
const getBudget = budget => ({type: GET_BUDGET, budget})
const updateBudget = budget => ({type: UPDATE_BUDGET, budget})

/**
 * THUNK CREATORS
 */
export const fetchBudget = () => async dispatch => {
  try {
    const res = await axios.get('/api/budgets')
    dispatch(getBudget(res.data || defaultBudget))
  } catch (err) {
    console.error(err)
  }
}

export const editBudget = update => async dispatch => {
  try {
    const res = await axios.put('/api/budgets', update)
    dispatch(updateBudget(res.data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultBudget, action) {
  switch (action.type) {
    case GET_BUDGET:
      return action.budget
    case UPDATE_BUDGET:
      return action.budget
    default:
      return state
  }
}
