import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleTransaction} from '../store/transactions'
import {Table} from 'react-bootstrap'

class SingleTransaction extends React.Component {
  componentDidMount() {
    const transId = this.props.match.params.transId
    this.props.fetchSingleTransaction(transId)
  }

  render() {
    const transaction = this.props.singleTransaction
    const items = this.props.items
    return transaction.name ? (
      <div>
        <h3>Name: {transaction.name}</h3>
        <p>Date: {transaction.date}</p>
        <p>Amount: $ {(transaction.amount / 100).toFixed(2)}</p>
        <p>Category: {transaction.category}</p>

        {items && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quality</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>$ {(item.price / 100).toFixed(2)}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
              <tr>
                <td>Subtotal</td>
                <td>$ {(transaction.subtotal / 100).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td>
                  ${' '}
                  {((transaction.amount - transaction.subtotal) / 100).toFixed(
                    2
                  )}
                </td>
              </tr>
              <tr>
                <td>Total</td>
                <td>$ {(transaction.amount / 100).toFixed(2)}</td>
              </tr>
            </tbody>
          </Table>
        )}
      </div>
    ) : (
      <div>Loading...</div>
    )
  }
}

const mapState = state => {
  return {
    singleTransaction: state.transactions.singleTransaction,
    items: state.transactions.items
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleTransaction: transId => dispatch(fetchSingleTransaction(transId))
  }
}

export default connect(mapState, mapDispatch)(SingleTransaction)
