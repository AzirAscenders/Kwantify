import React from 'react'
import {ResponsiveLine} from '@nivo/line'
import {connect} from 'react-redux'
import expenseCalculator from './expenseCalculator'

class Line extends React.Component {
  render() {
    const currentMonth = this.props.transactions.currentMonth
    const lastMonth = this.props.transactions.lastMonth
    const twoMonthsAgo = this.props.transactions.twoMonthsBefore

    const monthBank = {
      0: 'Jan',
      1: 'Feb',
      2: 'Mar',
      3: 'Apr',
      4: 'May',
      5: 'Jun',
      6: 'Jul',
      7: 'Aug',
      8: 'Sept',
      9: 'Oct',
      10: 'Nov',
      11: 'Dec'
    }

    const date = new Date()
    const month = date.getMonth()

    const twoMonthsTotal =
      expenseCalculator(twoMonthsAgo, 'Recreation') +
      expenseCalculator(twoMonthsAgo, 'Food and Drink') +
      expenseCalculator(twoMonthsAgo, 'Groceries') +
      expenseCalculator(twoMonthsAgo, 'Healthcare') +
      expenseCalculator(twoMonthsAgo, 'Shops') +
      expenseCalculator(twoMonthsAgo, 'Travel')

    const lastMonthTotal =
      expenseCalculator(lastMonth, 'Recreation') +
      expenseCalculator(lastMonth, 'Food and Drink') +
      expenseCalculator(lastMonth, 'Groceries') +
      expenseCalculator(lastMonth, 'Healthcare') +
      expenseCalculator(lastMonth, 'Shops') +
      expenseCalculator(lastMonth, 'Travel')

    const currentTotal =
      expenseCalculator(currentMonth, 'Recreation') +
      expenseCalculator(currentMonth, 'Food and Drink') +
      expenseCalculator(currentMonth, 'Groceries') +
      expenseCalculator(currentMonth, 'Healthcare') +
      expenseCalculator(currentMonth, 'Shops') +
      expenseCalculator(currentMonth, 'Travel')

    const month_5 = month => {
      if (month - 5 === -1) return 11
      else if (month - 5 === -2) return 10
      else if (month - 5 === -3) return 9
      else if (month - 5 === -4) return 8
      else if (month - 5 === -5) return 7
      else return month - 5
    }

    const month_4 = month => {
      if (month - 4 === -1) return 11
      else if (month - 4 === -2) return 10
      else if (month - 4 === -3) return 9
      else if (month - 4 === -4) return 8
      else return month - 4
    }

    const month_3 = month => {
      if (month - 3 === -1) return 11
      else if (month - 3 === -2) return 10
      else if (month - 3 === -3) return 9
      else return month - 3
    }

    const month_2 = month => {
      if (month - 2 === -1) return 11
      else if (month - 2 === -2) return 10
      else return month - 2
    }

    const month_1 = month => {
      if (month - 1 === -1) return 11
      else return month - 1
    }

    const data = [
      {
        id: 'Total Spending',
        color: 'hsl(214, 70%, 50%)',
        data: [
          {
            x: monthBank[month_5(month)],
            y: 200
          },
          {
            x: monthBank[month_4(month)],
            y: 400
          },
          {
            x: monthBank[month_3(month)],
            y: 100
          },
          {
            x: monthBank[month_2(month)],
            y: twoMonthsTotal
          },
          {
            x: monthBank[month_1(month)],
            y: lastMonthTotal
          },
          {
            x: monthBank[month],
            y: currentTotal
          }
        ]
      },
      {
        id: 'Travel',
        color: 'hsl(285, 70%, 50%)',
        data: [
          {
            x: monthBank[month_5(month)],
            y: 200
          },
          {
            x: monthBank[month_4(month)],
            y: 400
          },
          {
            x: monthBank[month_3(month)],
            y: 100
          },
          {
            x: monthBank[month_2(month)],
            y: expenseCalculator(twoMonthsAgo, 'Travel')
          },
          {
            x: monthBank[month_1(month)],
            y: expenseCalculator(lastMonth, 'Travel')
          },
          {
            x: monthBank[month],
            y: expenseCalculator(currentMonth, 'Travel')
          }
        ]
      },
      {
        id: 'Shopping',
        color: 'hsl(114, 70%, 50%)',
        data: [
          {
            x: monthBank[month_5(month)],
            y: 279
          },
          {
            x: monthBank[month_4(month)],
            y: 1000
          },
          {
            x: monthBank[month_3(month)],
            y: 377
          },
          {
            x: monthBank[month_2(month)],
            y: expenseCalculator(twoMonthsAgo, 'Shops')
          },
          {
            x: monthBank[month_1(month)],
            y: expenseCalculator(lastMonth, 'Shops')
          },
          {
            x: monthBank[month],
            y: expenseCalculator(currentMonth, 'Shops')
          }
        ]
      },
      {
        id: 'Healthcare',
        color: 'hsl(292, 70%, 50%)',
        data: [
          {
            x: monthBank[month_5(month)],
            y: 399
          },
          {
            x: monthBank[month_4(month)],
            y: 423
          },
          {
            x: monthBank[month_3(month)],
            y: 345
          },
          {
            x: monthBank[month_2(month)],
            y: expenseCalculator(twoMonthsAgo, 'Healthcare')
          },
          {
            x: monthBank[month_1(month)],
            y: expenseCalculator(lastMonth, 'Healthcare')
          },
          {
            x: monthBank[month],
            y: expenseCalculator(currentMonth, 'Healthcare')
          }
        ]
      },
      {
        id: 'Groceries',
        color: 'hsl(204, 70%, 50%)',
        data: [
          {
            x: monthBank[month_5(month)],
            y: 250
          },
          {
            x: monthBank[month_4(month)],
            y: 100
          },
          {
            x: monthBank[month_3(month)],
            y: 500
          },
          {
            x: monthBank[month_2(month)],
            y: expenseCalculator(twoMonthsAgo, 'Groceries')
          },
          {
            x: monthBank[month_1(month)],
            y: expenseCalculator(lastMonth, 'Groceries')
          },
          {
            x: monthBank[month],
            y: expenseCalculator(currentMonth, 'Groceries')
          }
        ]
      },
      {
        id: 'Food And Drink',
        color: 'hsl(204, 70%, 50%)',
        data: [
          {
            x: monthBank[month_5(month)],
            y: 200
          },
          {
            x: monthBank[month_4(month)],
            y: 700
          },
          {
            x: monthBank[month_3(month)],
            y: 100
          },
          {
            x: monthBank[month_2(month)],
            y: expenseCalculator(twoMonthsAgo, 'Food and Drink')
          },
          {
            x: monthBank[month_1(month)],
            y: expenseCalculator(lastMonth, 'Food and Drink')
          },
          {
            x: monthBank[month],
            y: expenseCalculator(currentMonth, 'Food and Drink')
          }
        ]
      },
      {
        id: 'Entertainment',
        color: 'hsl(204, 70%, 50%)',
        data: [
          {
            x: monthBank[month_5(month)],
            y: 400
          },
          {
            x: monthBank[month_4(month)],
            y: 234
          },
          {
            x: monthBank[month_3(month)],
            y: 359
          },
          {
            x: monthBank[month_2(month)],
            y: expenseCalculator(twoMonthsAgo, 'Recreation')
          },
          {
            x: monthBank[month_1(month)],
            y: expenseCalculator(lastMonth, 'Recreation')
          },
          {
            x: monthBank[month],
            y: expenseCalculator(currentMonth, 'Recreation')
          }
        ]
      }
    ]
    if (currentMonth.length || lastMonth.length || twoMonthsAgo.length) {
      return (
        <ResponsiveLine
          data={data}
          margin={{
            top: 50,
            right: 110,
            bottom: 50,
            left: 60
          }}
          xScale={{
            type: 'point'
          }}
          yScale={{
            type: 'linear',
            stacked: true,
            min: 'auto',
            max: 'auto'
          }}
          minY="auto"
          maxY="auto"
          stacked={true}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Months',
            legendOffset: 36,
            legendPosition: 'middle'
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Dollars ($)',
            legendOffset: -40,
            legendPosition: 'middle'
          }}
          dotSize={10}
          dotColor="inherit:darker(0.3)"
          dotBorderWidth={2}
          dotBorderColor="#ffffff"
          enableDotLabel={true}
          dotLabel="y"
          dotLabelYOffset={-12}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
        />
      )
    }
    return (
      <div className="no-data-message">
        <h3>
          You do not have any data.
          <br /> Please add transactions or connect to a bank.
        </h3>
      </div>
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

export default connect(mapState)(Line)
