import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {VictoryPie, VictoryLabel} from 'victory'
// import {Bar} from '@nivo/bar'
// import { Line } from '@nivo/line'
import PieChart from './PieChart'
import BarGraph from './BarGraph'
import BudgetsBarGraph from './BudgetsBarGraph'
import {fetchLink} from '../store/link'
import {fetchBudget} from '../store/budgets'
import {fetchTransactions} from '../store/transactions'
import CreateLink from './create-link'

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
      <div style={{height: '450px'}}>
        <CreateLink />
        <PieChart />
        <BarGraph />
        <BudgetsBarGraph />
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
