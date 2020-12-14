import React from 'react'
import {connect} from 'react-redux'
import {ResponsiveBar} from '@nivo/bar'
import {fetchTransactions} from '../store/transactions'
import expenseCalculator from './expenseCalculator'

class BarGraph extends React.Component {
  // componentDidMount() {
  //   this.props.fetchTransactions()
  // }

  render() {
    const currentMonth = this.props.transactions.currentMonth
    const lastMonth = this.props.transactions.lastMonth
    const twoMonthsAgo = this.props.transactions.twoMonthsBefore

    const monthBank = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December'
    }

    const date = new Date()
    const month = date.getMonth()

    const data = [
      {
        month: monthBank[month - 2],
        Entertainment: expenseCalculator(twoMonthsAgo, 'Recreation'),
        EntertainmentColor: 'hsl(325, 70%, 50%)',
        'Food & Drink': expenseCalculator(twoMonthsAgo, 'Food and Drink'),
        'Food & DrinkColor': 'hsl(153, 70%, 50%)',
        Groceries: expenseCalculator(twoMonthsAgo, 'Groceries'),
        GroceriesColor: 'hsl(49, 70%, 50%)',
        Healthcare: expenseCalculator(twoMonthsAgo, 'Healthcare'),
        HealthcareColor: 'hsl(274, 70%, 50%)',
        Shopping: expenseCalculator(twoMonthsAgo, 'Shops'),
        ShoppingColor: 'hsl(34, 70%, 50%)',
        Travel: expenseCalculator(twoMonthsAgo, 'Travel'),
        TravelColor: 'hsl(34, 70%, 50%)'
        // Others: twoMonthsAgo.reduce((accum, current)=>{
        //   if(current.category[0] === 'Recreation') {
        //     accum += current.amount
        //   }
        //   return accum
        // }, 0),
        // OthersColor: 'hsl(34, 70%, 50%)',
      },
      {
        month: monthBank[month - 1],
        Entertainment: expenseCalculator(lastMonth, 'Recreation'),
        EntertainmentColor: 'hsl(191, 70%, 50%)',
        'Food & Drink': expenseCalculator(lastMonth, 'Food and Drink'),
        'Food & DrinkColor': 'hsl(155, 70%, 50%)',
        Groceries: expenseCalculator(lastMonth, 'Groceries'),
        GroceriesColor: 'hsl(17, 70%, 50%)',
        Healthcare: expenseCalculator(lastMonth, 'Healthcare'),
        HealthcareColor: 'hsl(252, 70%, 50%)',
        Shopping: expenseCalculator(lastMonth, 'Shops'),
        ShoppingColor: 'hsl(197, 70%, 50%)',
        Travel: expenseCalculator(lastMonth, 'Travel'),
        TravelColor: 'hsl(34, 70%, 50%)'
        // Others: 95,
        // OthersColor: 'hsl(34, 70%, 50%)',
      },
      {
        month: monthBank[month],
        Entertainment: expenseCalculator(currentMonth, 'Recreation'),
        EntertainmentColor: 'hsl(294, 70%, 50%)',
        'Food & Drink': expenseCalculator(currentMonth, 'Food and Drink'),
        'Food & DrinkColor': 'hsl(95, 70%, 50%)',
        Groceries: expenseCalculator(currentMonth, 'Groceries'),
        GroceriesColor: 'hsl(269, 70%, 50%)',
        Healthcare: expenseCalculator(currentMonth, 'Healthcare'),
        HealthcareColor: 'hsl(62, 70%, 50%)',
        Shopping: expenseCalculator(currentMonth, 'Shops'),
        ShoppingColor: 'hsl(230, 70%, 50%)',
        Travel: expenseCalculator(currentMonth, 'Travel'),
        TravelColor: 'hsl(34, 70%, 50%)'
        // Others: 95,
        // OthersColor: 'hsl(34, 70%, 50%)',
      }
    ]

    return (
      <ResponsiveBar
        data={data}
        // width={900}
        // height={500}
        keys={[
          'Entertainment',
          'Food & Drink',
          'Groceries',
          'Healthcare',
          'Shopping',
          'Travel',
          'Others'
        ].reverse()}
        indexBy="month"
        // margin={{top: 50, right: 110, bottom: 50, left: 60}}
        margin={{
          top: 110,
          right: 110,
          bottom: 50,
          left: 10
        }}
        padding={0.02}
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
              id: 'healthcare'
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
          legend: 'Month',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Categories',
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
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemWidth: 80,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.75,
            symbolSize: 12,
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
        // animate={true}
        // motionStiffness={90}
        // motionDamping={15}
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
    fetchTransactions: () => dispatch(fetchTransactions())
  }
}

export default connect(mapState, mapDispatch)(BarGraph)
