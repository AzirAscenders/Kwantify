/* eslint-disable complexity */
import React from 'react'
import {Table} from 'react-bootstrap'
import {connect} from 'react-redux'
import {fetchTransactions, selected, filtered} from '../store/transactions'
import AddReceipt from './AddReceipt'
import {Link} from 'react-router-dom'

class Transactions extends React.Component {
  constructor() {
    super()
    this.state = {
      category: 'All'
    }
    this.changeOption = this.changeOption.bind(this)
    this.changeCategory = this.changeCategory.bind(this)
  }

  componentDidMount() {
    this.props.fetchTransactions()
  }

  changeCategory(e) {
    const selectedTransactions = this.props.transactions.selected
    const category = e.target.value
    this.setState({category})

    if (category === 'Others') {
      this.props.filtered(
        selectedTransactions.filter(element => element.category === 'Payment')
      )
    } else if (category === 'All') {
      this.props.filtered(selectedTransactions)
    } else {
      this.props.filtered(
        selectedTransactions.filter(element => element.category === category)
      )
    }
  }

  async changeOption(e) {
    let transactions = this.props.transactions
    const category = this.state.category

    if (e.target.value === 'currentMonth') {
      await this.props.selected(transactions.currentMonth)
    } else if (e.target.value === 'lastMonth') {
      await this.props.selected(transactions.lastMonth)
    } else if (e.target.value === 'twoMonthsAgo') {
      await this.props.selected(transactions.twoMonthsBefore)
    } else {
      await this.props.selected(transactions.transactions)
    }

    // CANNOT ERASE!! THIS LINE RESASSIGNS transactions with NEW DATA created from line4 47 to 55!!
    transactions = this.props.transactions

    if (category === 'Others') {
      this.props.filtered(
        transactions.selected.filter(element => element.category === 'Payment')
      )
    } else if (category === 'All') {
      this.props.filtered(transactions.selected)
    } else {
      this.props.filtered(
        transactions.selected.filter(element => element.category === category)
      )
    }
  }

  render() {
    const transactions = this.props.transactions.filtered
    return (
      <div>
        <AddReceipt />
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
          <option value="All">All</option>
          <option value="Food and Drink">Food And Drinks</option>
          <option value="Travel">Travel</option>
          <option value="Recreation">Entertainment</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Shops">Shopping</option>
          <option value="Groceries">Groceries</option>
          <option value="Others">Others</option>
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
                <td>
                  <Link to={`/transactions/${transaction.id}`}>
                    {transaction.name}
                  </Link>
                </td>
                <td>{transaction.category}</td>
                <td>${transaction.amount.toFixed(2)}</td>
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
    selected: transactions => dispatch(selected(transactions)),
    filtered: transactions => dispatch(filtered(transactions))
  }
}

export default connect(mapState, mapDispatch)(Transactions)
