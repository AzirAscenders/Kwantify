import React from 'react'
import {connect} from 'react-redux'
import {ResponsivePie} from '@nivo/pie'
import {fetchTransactions} from '../store/transactions'

class PieChart extends React.Component {
  // componentDidMount() {
  //   this.props.fetchTransactions()
  // }

  render() {
    const travel = []
    const healthcare = []
    const shopping = []
    const groceries = []
    const foodAndDrink = []
    const entertainment = []
    const others = []

    this.props.transactions.currentMonth.map(transaction => {
      if (transaction.category === 'Travel') travel.push(transaction)
      else if (transaction.category === 'Shops') shopping.push(transaction)
      else if (transaction.category === 'Food and Drink')
        foodAndDrink.push(transaction)
      else if (transaction.category === 'Recreation')
        entertainment.push(transaction)
      else others.push(transaction)
    })

    const data = [
      {
        id: 'Entertainment',
        label: 'Entertainment',
        value:
          entertainment.reduce(
            (accumulator, transaction) =>
              accumulator + transaction.amount * 100,
            0
          ) / 100
      },
      {
        id: 'Food & Drink',
        label: 'Food & Drink',
        value:
          foodAndDrink.reduce(
            (accumulator, transaction) =>
              accumulator + transaction.amount * 100,
            0
          ) / 100
      },
      {
        id: 'Groceries',
        label: 'Groceries',
        value:
          groceries.reduce(
            (accumulator, transaction) =>
              accumulator + transaction.amount * 100,
            0
          ) / 100
      },
      {
        id: 'HealthCare',
        label: 'Healthcare',
        value:
          healthcare.reduce(
            (accumulator, transaction) =>
              accumulator + transaction.amount * 100,
            0
          ) / 100
      },
      {
        id: 'Shopping',
        label: 'Shopping',
        value:
          shopping.reduce(
            (accumulator, transaction) =>
              accumulator + transaction.amount * 100,
            0
          ) / 100
      },
      {
        id: 'Travel',
        label: 'Travel',
        value:
          travel.reduce(
            (accumulator, transaction) =>
              accumulator + transaction.amount * 100,
            0
          ) / 100
      }
      // {
      //   id: 'Others',
      //   label: 'Others',
      //   value: others.reduce(
      //     (accumulator, transaction) => accumulator + transaction.amount,
      //     0
      //   ),
      // },
    ]

    return (
      <ResponsivePie
        data={data}
        // width={900}
        // height={500}
        margin={{top: 40, right: 0, bottom: 80, left: 0}}
        theme={{fontSize: 18}}
        innerRadius={0.5}
        padAngle={2}
        cornerRadius={3}
        colors={{scheme: 'pastel1'}}
        borderWidth={3}
        borderColor={{from: 'color', modifiers: [['darker', 0.2]]}}
        enableSliceLabels={false}
        enableRadialLabels={false}
        radialLabelsLinkDiagonalLength={24}
        radialLabelsTextXOffset={7}
        radialLabelsLinkHorizontalLength={29}
        sliceLabelsTextColor="#333333"
        radialLabelsLinkColor={{from: 'color', modifiers: []}}
        radialLabelsLinkStrokeWidth={2}
        // legends={[
        //   {
        //     anchor: 'bottom',
        //     direction: 'row',
        //     justify: false,
        //     translateX: 0,
        //     translateY: 56,
        //     itemsSpacing: 0,
        //     itemWidth: 100,
        //     itemHeight: 18,
        //     itemTextColor: '#999',
        //     itemDirection: 'left-to-right',
        //     itemOpacity: 1,
        //     symbolSize: 18,
        //     symbolShape: 'circle',
        //     effects: [
        //       {
        //         on: 'hover',
        //         style: {
        //           itemTextColor: '#000',
        //         },
        //       },
        //       {
        //         on: 'mouseEnter',
        //         style: {
        //           itemTextColor: 'white',
        //         },
        //       },
        //     ],
        //   },
        // ]}
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

export default connect(mapState, mapDispatch)(PieChart)
