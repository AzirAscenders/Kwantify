/* eslint-disable complexity */

import React from 'react'
import {connect} from 'react-redux'
import {ResponsiveBar} from '@nivo/bar'
import {fetchTransactions} from '../store/transactions'
import {fetchBudget} from '../store/budgets'

class BudgetsBarGraph extends React.Component {
  // componentDidMount() {
  //   this.props.fetchTransactions()
  //   this.props.fetchBudget()
  // }

  render() {
    const travel = []
    const healthcare = []
    const shopping = []
    const groceries = []
    const foodAndDrink = []
    const entertainment = []
    const others = []

    this.props.transactions.transactions.map(transaction => {
      if (transaction.category[0] === 'Travel') travel.push(transaction)
      else if (transaction.category[0] === 'Shops') shopping.push(transaction)
      else if (transaction.category[0] === 'Food and Drink')
        foodAndDrink.push(transaction)
      else if (transaction.category[0] === 'Recreation')
        entertainment.push(transaction)
      else others.push(transaction)
    })

    const entertainmentExp =
      entertainment.reduce(
        (accumulator, transaction) => (accumulator += transaction.amount * 100),
        0
      ) / 100

    const foodAndDrinkExp =
      foodAndDrink.reduce(
        (accumulator, transaction) => (accumulator += transaction.amount * 100),
        0
      ) / 100

    const groceriesExp =
      groceries.reduce(
        (accumulator, transaction) => (accumulator += transaction.amount * 100),
        0
      ) / 100

    const healthcareExp =
      healthcare.reduce(
        (accumulator, transaction) => (accumulator += transaction.amount * 100),
        0
      ) / 100

    const shoppingExp =
      shopping.reduce(
        (accumulator, transaction) => (accumulator += transaction.amount * 100),
        0
      ) / 100

    const travelExp =
      travel.reduce(
        (accumulator, transaction) => (accumulator += transaction.amount * 100),
        0
      ) / 100

    const totalSpent =
      entertainmentExp +
      foodAndDrinkExp +
      groceriesExp +
      healthcareExp +
      shoppingExp +
      travelExp

    const budgets = this.props.budgets
    console.log('TOTALLL', totalSpent)
    const data = [
      {
        category: 'Total Spending',
        spent: totalSpent || 0,
        spentColor: 'hsl(34, 70%, 50%)',
        budget: budgets.totalSpending / 100 || 0,
        budgetColor: 'hsl(72, 70%, 50%)'
      },
      {
        category: 'Travel',
        spent: travelExp || 0,
        spentColor: '#fbb4ae',
        budget: budgets.travel / 100 - travelExp || 0,
        budgetColor: 'hsl(72, 70%, 50%)'
      },
      {
        category: 'Shopping',
        spent: shoppingExp || 0,
        spentColor: '#ccebc5',
        budget: budgets.shopping / 100 - shoppingExp || 0,
        budgetColor: 'hsl(9, 70%, 50%)'
      },
      {
        category: 'Healthcare',
        spent: healthcareExp || 0,
        spentColor: '#b3cde3',
        budget: budgets.healthcare / 100 - healthcareExp || 0,
        budgetColor: 'hsl(266, 70%, 50%)'
      },
      {
        category: 'Groceries',
        spent: groceriesExp || 0,
        spentColor: '#decbe4',
        budget: budgets.groceries / 100 - groceriesExp || 0,
        budgetColor: 'hsl(95, 70%, 50%)'
      },
      {
        category: 'Food & Drinks',
        spent: foodAndDrinkExp || 0,
        spentColor: '#fed9a6',
        budget: budgets.foodAndDrink / 100 - foodAndDrinkExp || 0,
        budgetColor: 'hsl(155, 70%, 50%)'
      },
      {
        category: 'Entertainment',
        spent: entertainmentExp || 0,
        spentColor: '#ffffcc',
        budget: budgets.entertainment / 100 - entertainmentExp || 0,
        budgetColor: 'hsl(153, 70%, 50%)'
      }
    ]

    return (
      <ResponsiveBar
        data={data}
        layout="horizontal"
        width={900}
        height={500}
        keys={['spent', 'budget']}
        indexBy="category"
        margin={{top: 50, right: 130, bottom: 50, left: 60}}
        padding={0.3}
        valueScale={{type: 'linear'}}
        indexScale={{type: 'band', round: true}}
        colors={{scheme: 'nivo'}}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        fill={[
          {
            match: {
              id: 'fries'
            },
            id: 'dots'
          },
          {
            match: {
              id: 'sandwich'
            },
            id: 'lines'
          }
        ]}
        borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Dollar ($)',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Category',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    budgets: state.budgets,
    transactions: state.transactions
  }
}

const mapDispatch = dispatch => {
  return {
    fetchBudget: () => dispatch(fetchBudget()),
    fetchTransactions: () => dispatch(fetchTransactions())
  }
}

export default connect(mapState, mapDispatch)(BudgetsBarGraph)
