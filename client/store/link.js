import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_LINK = 'GET_LINK'

/**
 * INITIAL STATE
 */
const defaultLink = {}

/**
 * ACTION CREATORS
 */
const getLink = link => ({type: GET_LINK, link})

/**
 * THUNK CREATORS
 */
export const fetchLink = () => async dispatch => {
  try {
    const res = await axios.post('/api/plaid/get_link_token')
    dispatch(getLink(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultLink, action) {
  switch (action.type) {
    case GET_LINK:
      return action.link
    default:
      return state
  }
}
