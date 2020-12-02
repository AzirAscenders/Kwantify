import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_BUDGET = 'GET_BUDGET'

/**
 * INITIAL STATE
 */
const defaultBudget = {}

/**
 * ACTION CREATORS
 */
const getBudget = budget => ({type: GET_BUDGET, budget})

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

/**
 * REDUCER
 */
export default function(state = defaultBudget, action) {
  switch (action.type) {
    case GET_BUDGET:
      return action.budget
    default:
      return state
  }
}
