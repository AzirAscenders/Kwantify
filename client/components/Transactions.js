import React from 'react'
import {Table} from 'react-bootstrap'
import {connect} from 'react-redux'
import {fetchTransactions} from '../store/transactions'

class Transactions extends React.Component {
  // constructor() {
  //   super()
  //   this.changeOption = this.changeOption.bind(this)
  // }

  componentDidMount() {
    this.props.fetchTransactions()
  }

  // changeOption(e) {
  //   let transactions = this.props.transactions
  //   if (e.target.value === 'currentMonth') {

  //   } else if (e.target.value === 'lastMonth') {
  //   } else if(e.target.value === 'twoMonthsAgo'){
  //   }
  // }

  render() {
    const transactions = this.props.transactions
    return (
      <div>
        <h2>All Transactions</h2>
        <select onChange={this.changeOption}>
          <option value="all">All</option>
          <option value="currentMonth">Current Month</option>
          <option value="lastMonth">Last Month</option>
          <option value="twoMonthsAgo">2 Month Ago</option>
        </select>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, idx) => (
              <tr key={idx}>
                <td>{transaction.date}</td>
                <td>{transaction.name}</td>
                <td>{transaction.category[0]}</td>
                <td>${transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

const mapState = state => {
  return {
    transactions: state.transactions
  }
}

const mapDispatch = dispatch => {
  return {
    fetchTransactions: () => dispatch(fetchTransactions())
  }
}

export default connect(mapState, mapDispatch)(Transactions)
