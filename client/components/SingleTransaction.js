import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleTransaction} from '../store/transactions'

class SingleTransaction extends React.Component {
  componentDidMount() {
    const transId = this.props.match.params.transId
    console.log('THIS PROPS', this.props.match)
    this.props.fetchSingleTransaction(transId)
  }

  render() {
    const transaction = this.props.singleTransaction
    console.log('TRANSACT', this.props.singleTransaction)
    return transaction.name ? (
      <div>
        <h3>Name: {transaction.name}</h3>
        <p>Date: {transaction.date}</p>
        <p>Amount: $ {(transaction.amount / 100).toFixed(2)}</p>
        <p>Category: {transaction.category}</p>
      </div>
    ) : (
      <div>Loading...</div>
    )
  }
}

const mapState = state => {
  return {
    singleTransaction: state.transactions.singleTransaction
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleTransaction: transId => dispatch(fetchSingleTransaction(transId))
  }
}

export default connect(mapState, mapDispatch)(SingleTransaction)
