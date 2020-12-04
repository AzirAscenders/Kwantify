import React from 'react'
import {Table} from 'react-bootstrap'
import {connect} from 'react-redux'
import {fetchTransactions, selected} from '../store/transactions'

class Transactions extends React.Component {
  constructor() {
    super()
    this.changeOption = this.changeOption.bind(this)
  }

  componentDidMount() {
    this.props.fetchTransactions()
  }

  changeOption(e) {
    const transactions = this.props.transactions
    if (e.target.value === 'currentMonth') {
      this.props.selected(transactions.currentMonth)
    } else if (e.target.value === 'lastMonth') {
      this.props.selected(transactions.lastMonth)
    } else if (e.target.value === 'twoMonthsAgo') {
      this.props.selected(transactions.twoMonthsBefore)
    } else {
      this.props.selected(transactions.transactions)
    }
  }

  render() {
    const transactions = this.props.transactions.selected
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
    fetchTransactions: () => dispatch(fetchTransactions()),
    selected: transactions => dispatch(selected(transactions))
  }
}

export default connect(mapState, mapDispatch)(Transactions)
