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
// import {Card} from 'react-bootstrap'
import {Responsive, WidthProvider} from 'react-grid-layout'

import 'react-resizable/css/styles.css'

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
    // Handles the responsive nature of the grid
    const ResponsiveGridLayout = WidthProvider(Responsive)
    // Determines the screen breakpoints for the columns
    const breakpoints = {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 320}
    // How many columns are available at each breakpoint
    const cols = {lg: 4, md: 4, sm: 1, xs: 1, xxs: 1}

    return (
      <div className="App">
        <div className="w-full">
          <header className="flex bg-gray-900 m-5 p-5 shadow-lg rounded-lg">
            <h1 className="text-2xl text-teal-400">Summary Dashboard</h1>
          </header>
          {/* <div id="pie">
            <BudgetBullet />
          </div> */}
          <ResponsiveGridLayout
            className="my-5 mx-8"
            id="visualization"
            breakpoints={breakpoints}
            cols={cols}
          >
            <div
              className="grid-cell"
              id="pie"
              key="3"
              data-grid={{x: 0, y: 3, w: 1, h: 2, static: true}}
            >
              <h3 className="grid-header">Current Month Expenses</h3>
              <PieChart />
            </div>

            <div
              className="grid-cell"
              key="4"
              data-grid={{x: 2, y: 3, w: 3, h: 2, static: true}}
            >
              <h3 className="grid-header">Month by Month Expenses</h3>
              <BarGraph />
            </div>

            {/* <div
              className="grid-cell"
              key="2"
              data-grid={{x: 2, y: 3, w: 5, h: 2, static: true}}
            >
              <h3 className="grid-header">Current Month Budget vs Expenses</h3>
              <BudgetBullet />
            </div> */}

            {/* <div id="charts"> */}
            {/* <div id="charts"> */}
            {/* <div id="pie-chart">
              <PieChart />
            </div>
            <div id="bullet">
              <BudgetBullet />
            </div>
            <div id="bar-graph">
              <BarGraph />
            </div> */}
          </ResponsiveGridLayout>
          {/* <BudgetsBarGraph /> */}
          {/* </div> */}
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
