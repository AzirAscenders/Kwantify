/* eslint-disable complexity */
import React from 'react'
import {Table} from 'react-bootstrap'
import {connect} from 'react-redux'
import {fetchTransactions, selected} from '../store/transactions'

class Transactions extends React.Component {
  constructor() {
    super()
    this.changeOption = this.changeOption.bind(this)
    this.changeCategory = this.changeCategory.bind(this)
  }

  componentDidMount() {
    this.props.fetchTransactions()
  }

  changeCategory(e) {
    const transactions = this.props.transactions.transactions
    if (e.target.value === 'others') {
      this.props.selected(
        transactions.filter(element => element.category[0] === 'Payment')
      )
    } else if (e.target.value === 'all') {
      this.props.selected(transactions)
    } else {
      this.props.selected(
        transactions.filter(element => element.category[0] === e.target.value)
      )
    }
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
        <label htmlFor="date">Choose Period:</label>
        <select onChange={this.changeOption}>
          <option value="all">All</option>
          <option value="currentMonth">Current Month</option>
          <option value="lastMonth">Last Month</option>
          <option value="twoMonthsAgo">2 Month Ago</option>
        </select>
        <label htmlFor="category">Choose Category:</label>
        <select onChange={this.changeCategory}>
          <option value="all">All</option>
          <option value="Food and Drink">Food And Drinks</option>
          <option value="Travel">Travel</option>
          <option value="Recreation">Entertainment</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Shops">Shopping</option>
          <option value="Groceries">Groceries</option>
          <option value="others">Others</option>
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
