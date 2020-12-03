import React from 'react'
import {editBudget, fetchBudget} from '../store/budgets'
import {connect} from 'react-redux'
import {Table} from 'react-bootstrap'

/**
 * COMPONENT
 */
class Budgets extends React.Component {
  constructor() {
    super()
    this.state = {
      foodAndDrink: '',
      travel: '',
      entertainment: '',
      healthcare: '',
      shopping: '',
      groceries: '',
      update: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.fetchBudget()
  }

  componentDidUpdate() {
    const budgets = this.props.budgets
    if (!this.state.update) {
      this.setState({
        foodAndDrink: (budgets.foodAndDrink / 100).toFixed(2),
        travel: (budgets.travel / 100).toFixed(2),
        entertainment: (budgets.entertainment / 100).toFixed(2),
        healthcare: (budgets.healthcare / 100).toFixed(2),
        shopping: (budgets.shopping / 100).toFixed(2),
        groceries: (budgets.groceries / 100).toFixed(2),
        update: true
      })
    }
  }

  async handleSubmit(event) {
    event.preventDefault()
    const filteredBudget = Object.keys(this.state).filter(
      budget => budget !== 'update'
    )

    const totalSpending = filteredBudget.reduce(
      (accumulator, budget) => accumulator + Number(this.state[budget]),
      0
    )

    const update = {...this.state, totalSpending: totalSpending}
    await this.props.editBudget(update)

    const budgets = this.props.budgets
    this.setState({
      foodAndDrink: (budgets.foodAndDrink / 100).toFixed(2),
      travel: (budgets.travel / 100).toFixed(2),
      entertainment: (budgets.entertainment / 100).toFixed(2),
      healthcare: (budgets.healthcare / 100).toFixed(2),
      shopping: (budgets.shopping / 100).toFixed(2),
      groceries: (budgets.groceries / 100).toFixed(2),
      update: true
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const {budgets} = this.props
    const filteredBudget = Object.keys(budgets).filter(
      budget => budget !== 'totalSpending'
    )

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Table size="sm">
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
                <td>{`$ ${(budgets.entertainment / 100 || 0).toFixed(2)}`}</td>
                <td>
                  ${' '}
                  <input
                    type="text"
                    name="entertainment"
                    value={this.state.entertainment}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Food And Drink</td>
                <td>{`$ ${(budgets.foodAndDrink / 100 || 0).toFixed(2)}`}</td>
                <td>
                  ${' '}
                  <input
                    type="text"
                    name="foodAndDrink"
                    value={this.state.foodAndDrink}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Groceries</td>
                <td>{`$ ${(budgets.groceries / 100 || 0).toFixed(2)}`}</td>
                <td>
                  ${' '}
                  <input
                    type="text"
                    name="groceries"
                    value={this.state.groceries}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Healthcare</td>
                <td>{`$ ${(budgets.healthcare / 100 || 0).toFixed(2)}`}</td>
                <td>
                  ${' '}
                  <input
                    type="text"
                    name="healthcare"
                    value={this.state.healthcare}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Shopping</td>
                <td>{`$ ${(budgets.shopping / 100 || 0).toFixed(2)}`}</td>
                <td>
                  ${' '}
                  <input
                    type="text"
                    name="shopping"
                    value={this.state.shopping}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Travel</td>
                <td>{`$ ${(budgets.travel / 100 || 0).toFixed(2)}`}</td>
                <td>
                  ${' '}
                  <input
                    type="text"
                    name="travel"
                    value={this.state.travel}
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td>Total Spending</td>
                <td>{`$ ${(
                  filteredBudget.reduce(
                    (accumulator, budget) => accumulator + budgets[budget],
                    0
                  ) / 100
                ).toFixed(2)}`}</td>
              </tr>
            </tbody>
          </Table>
          <button type="submit">Update</button>
        </form>
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
    fetchBudget: () => dispatch(fetchBudget()),
    editBudget: update => dispatch(editBudget(update))
  }
}

export default connect(mapState, mapDispatch)(Budgets)
