import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {VictoryPie, VictoryLabel} from 'victory'
// import {Bar} from '@nivo/bar'
// import { Line } from '@nivo/line'
import PieChart from './PieChart'
import BarGraph from './BarGraph'
// import BudgetsBarGraph from './BudgetsBarGraph'
import BudgetBullet from './BudgetBullet'
import {fetchLink} from '../store/link'
import {fetchBudget} from '../store/budgets'
import {fetchTransactions} from '../store/transactions'
import {Card} from 'react-bootstrap'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  componentDidMount() {
    this.props.fetchLink()
    this.props.fetchBudget()
    this.props.fetchTransactions()
  }

  render() {
    return (
      <div id="summary-page">
        <div id="charts">
          {/* <div id="charts"> */}
          {/* <div> */}
          <PieChart />
          {/* </div> */}
          {/* <div> */}
          <BudgetBullet />
          {/* </div> */}
          {/* <div> */}
          <BarGraph />
          {/* </div> */}
          {/* <BudgetsBarGraph /> */}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    budgets: state.budgets,
    transactions: state.transactions
  }
}

const mapDispatch = dispatch => {
  return {
    fetchLink: () => dispatch(fetchLink()),
    fetchBudget: () => dispatch(fetchBudget()),
    fetchTransactions: () => dispatch(fetchTransactions())
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
