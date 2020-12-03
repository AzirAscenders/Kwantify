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
      totalSpending: '',
      foodAndDrink: '',
      travel: '',
      entertainment: '',
      healthcare: '',
      shopping: '',
      groceries: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.fetchBudget()
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  async handleChange(event) {
    await this.setState({
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
        <form>
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
                <td>{`$ ${(budgets.entertainment / 100 || 0).toFixed(2)}`}</td>
                <td>
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
              </tr>
              <tr>
                <td>Groceries</td>
                <td>{`$ ${(budgets.groceries / 100 || 0).toFixed(2)}`}</td>
              </tr>
              <tr>
                <td>Healthcare</td>
                <td>{`$ ${(budgets.healthcare / 100 || 0).toFixed(2)}`}</td>
              </tr>
              <tr>
                <td>Shopping</td>
                <td>{`$ ${(budgets.shopping / 100 || 0).toFixed(2)}`}</td>
              </tr>
              <tr>
                <td>Travel</td>
                <td>{`$ ${(budgets.travel / 100 || 0).toFixed(2)}`}</td>
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
    fetchBudget: () => dispatch(fetchBudget())
  }
}

export default connect(mapState, mapDispatch)(Budgets)
