import React from 'react'
import {connect} from 'react-redux'
import {ResponsiveBullet} from '@nivo/bullet'
import expenseCalculator from './expenseCalculator'

class BudgetBullet extends React.Component {
  render() {
    const budgets = this.props.budgets
    const currentMonth = this.props.transactions.currentMonth
    console.log(currentMonth)
    const totalSpending =
      currentMonth.reduce((accum, current) => accum + current.amount * 100, 0) /
      100

    const data = [
      {
        id: 'Entertainment',
        ranges: [budgets.entertainment / 100],
        measures: [expenseCalculator(currentMonth, 'Recreation')]
      },
      {
        id: 'Food & Drink',
        ranges: [budgets.foodAndDrink / 100],
        measures: [expenseCalculator(currentMonth, 'Food and Drink')]
      },
      {
        id: 'Groceries',
        ranges: [budgets.groceries / 100],
        measures: [expenseCalculator(currentMonth, 'Groceries')]
      },
      {
        id: 'Healthcare',
        ranges: [budgets.healthcare / 100],
        measures: [expenseCalculator(currentMonth, 'Healthcare')]
      },
      {
        id: 'Shopping',
        ranges: [budgets.shopping / 100],
        measures: [expenseCalculator(currentMonth, 'Shops')]
      },
      {
        id: 'Travel',
        ranges: [budgets.travel / 100],
        measures: [expenseCalculator(currentMonth, 'Travel')]
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
        measures: [totalSpending]
      }
    ]

    console.log(currentMonth)
    return (
      budgets.totalSpending !== 'undefined' &&
      currentMonth.length && (
        <ResponsiveBullet
          data={data}
          // width={900}
          // height={500}
          margin={{top: 50, right: 90, bottom: 50, left: 90}}
          titleAlign="start"
          titleOffsetX={-70}
          measureSize={0.3}
          measureColors="#1f77b4"
          rangeColors="#ff7f0e"
        />
      )
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
