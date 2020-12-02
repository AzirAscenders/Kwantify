import React from 'react'
import {fetchBudget} from '../store/budgets'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'

/**
 * COMPONENT
 */
class Budgets extends React.Component {
  constructor() {
    super()
    this.state = {
      totalSpending: 0,
      foodAndDrink: 0,
      travel: 0,
      entertainment: 0,
      healthcare: 0,
      shopping: 0,
      groceries: 0
    }
  }
  componentDidMount() {
    this.props.fetchBudget()
  }

  render() {
    const {budgets} = this.props
    const budgetKeys = Object.keys(budgets).sort((a, b) => a - b)

    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th />
              <th>Current Budget</th>
              <th>Edit your Budget</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Entertainment</td>
              <td>{`$ ${(budgets.entertainment / 100).toFixed(2)}`}</td>
            </tr>
            <tr>
              <td>Food And Drink</td>
              <td>{`$ ${(budgets.foodAndDrink / 100).toFixed(2)}`}</td>
            </tr>
            <tr>
              <td>Groceries</td>
              <td>{`$ ${(budgets.groceries / 100).toFixed(2)}`}</td>
            </tr>
            <tr>
              <td>Healthcare</td>
              <td>{`$ ${(budgets.healthcare / 100).toFixed(2)}`}</td>
            </tr>
            <tr>
              <td>Shopping</td>
              <td>{`$ ${(budgets.shopping / 100).toFixed(2)}`}</td>
            </tr>
            <tr>
              <td>Total Spending</td>
              <td>{`$ ${(budgets.totalSpending / 100).toFixed(2)}`}</td>
            </tr>
            <tr>
              <td>Travel</td>
              <td>{`$ ${(budgets.travel / 100).toFixed(2)}`}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    budgets: state.budgets
  }
}

const mapDispatch = dispatch => {
  return {
    fetchBudget: () => dispatch(fetchBudget())
  }
}

export default connect(mapState, mapDispatch)(Budgets)
