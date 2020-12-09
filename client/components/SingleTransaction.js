import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleTransaction} from '../store/transactions'

class SingleTransaction extends React.Component {
  componentDidMount() {
    const transId = this.props.match.params.transId
    console.log('THIS MATCH', this.props.match)
    this.props.fetchSingleTransaction(transId)
  }

  render() {
    const transaction = this.props.singleTransaction
    return transaction.name ? (
      <div>{transaction.name}</div>
    ) : (
      <div>Hello World</div>
    )
  }
}

const mapState = state => {
  return {
    singleTransaction: state.singleTransaction
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleTransaction: transId => dispatch(fetchSingleTransaction(transId))
  }
}

export default connect(mapState, mapDispatch)(SingleTransaction)
