import React from 'react'
import {connect} from 'react-redux'
import {ResponsiveBullet} from '@nivo/bullet'

class BudgetBullet extends React.Component {
  render() {
    const budgets = this.props.budgets

    const data = [
      {
        id: 'Entertainment',
        ranges: [budgets.entertainment / 100],
        measures: [150]
      },
      {
        id: 'Food & Drink',
        ranges: [budgets.foodAndDrink / 100],
        measures: [5]
      },
      {
        id: 'Groceries',
        ranges: [budgets.groceries / 100],
        measures: [5]
      },
      {
        id: 'Healthcare',
        ranges: [budgets.healthcare / 100],
        measures: [5]
      },
      {
        id: 'Shopping',
        ranges: [budgets.shopping / 100],
        measures: [5]
      },
      {
        id: 'Travel',
        ranges: [budgets.travel / 100],
        measures: [5]
      },
      // {
      //   "id": "Others",
      //   "ranges": [
      //     9
      //   ],
      //   "measures": [
      //     2
      //   ],
      // }
      {
        id: 'Total Spendings',
        ranges: [budgets.totalSpending / 100],
        measures: [5]
      }
    ]

    return (
      <ResponsiveBullet
        data={data}
        width={900}
        height={500}
        margin={{top: 50, right: 90, bottom: 50, left: 90}}
        titleAlign="start"
        titleOffsetX={-70}
        measureSize={0.3}
        measureColors="#1f77b4"
        rangeColors="#ff7f0e"
      />
    )
  }
}

const mapState = state => {
  return {
    budgets: state.budgets,
    transactions: state.transactions
  }
}

export default connect(mapState, null)(BudgetBullet)
