import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {VictoryPie, VictoryLabel} from 'victory'
import {Pie} from '@nivo/pie'
// import {Bar} from '@nivo/bar'
// import { Line } from '@nivo/line'
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
    const {email} = this.props

    const travel = []
    const healthcare = []
    const shopping = []
    const groceries = []
    const foodAndDrink = []
    const entertainment = []
    const others = []

    this.props.transactions.map(bank =>
      bank.map(transaction => {
        if (transaction.category[0] === 'Travel') travel.push(transaction)
        else if (transaction.category[0] === 'Shops') shopping.push(transaction)
        else if (transaction.category[0] === 'Food and Drink')
          foodAndDrink.push(transaction)
        else if (transaction.category[0] === 'Recreation')
          entertainment.push(transaction)
        else others.push(transaction)
      })
    )

    const data = [
      {
        id: 'Travel',
        label: 'Travel',
        value:
          travel.reduce(
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
        id: 'Entertainment',
        label: 'Entertainment',
        value:
          entertainment.reduce(
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

    console.log(foodAndDrink)
    return (
      <div>
        <CreateLink />
        <Pie
          data={data}
          width={900}
          height={500}
          margin={{top: 40, right: 200, bottom: 80, left: 350}}
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
          legends={[
            {
              anchor: 'bottom',
              direction: 'column',
              justify: false,
              translateX: 200,
              translateY: -32,
              itemsSpacing: 0,
              itemWidth: 0,
              itemHeight: 55,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000'
                  }
                },
                {
                  on: 'mouseEnter',
                  style: {
                    itemTextColor: 'white'
                  }
                }
              ]
            }
          ]}
        />
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
