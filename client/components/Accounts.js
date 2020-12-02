import React from 'react'
import {connect} from 'react-redux'
import {fetchAllAcounts} from '../store/accounts'

class Accounts extends React.Component {
  componentDidMount() {
    this.props.fetchAllAccounts(this.props.user.id)
  }

  render() {
    const accounts = this.props.accounts
    return <div>{accounts ? <div /> : <div>Loading</div>}</div>
  }
}

const mapState = state => {
  return {
    accounts: state.accounts,
    user: state.users
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllAccounts: userId => dispatch(fetchAllAcounts(userId))
  }
}

export default connect(mapState, mapDispatch)(Accounts)
