import React from 'react'
import {connect} from 'react-redux'
import {ResponsiveBar} from '@nivo/bar'
import {fetchTransactions} from '../store/transactions'

class BarGraph extends React.Component {
  componentDidMount() {
    this.props.fetchTransactions()
  }

  render() {
    const data = [
      {
        country: 'AD',
        burger: 71,
        burgerColor: 'hsl(325, 70%, 50%)',
        sandwich: 57,
        sandwichColor: 'hsl(153, 70%, 50%)',
        kebab: 85,
        kebabColor: 'hsl(49, 70%, 50%)',
        fries: 23,
        friesColor: 'hsl(274, 70%, 50%)',
        donut: 95,
        donutColor: 'hsl(34, 70%, 50%)'
      },
      {
        country: 'AE',
        burger: 98,
        burgerColor: 'hsl(191, 70%, 50%)',
        sandwich: 112,
        sandwichColor: 'hsl(155, 70%, 50%)',
        kebab: 189,
        kebabColor: 'hsl(17, 70%, 50%)',
        fries: 69,
        friesColor: 'hsl(252, 70%, 50%)',
        donut: 136,
        donutColor: 'hsl(197, 70%, 50%)'
      },
      {
        country: 'AF',
        burger: 93,
        burgerColor: 'hsl(294, 70%, 50%)',
        sandwich: 27,
        sandwichColor: 'hsl(95, 70%, 50%)',
        kebab: 31,
        kebabColor: 'hsl(269, 70%, 50%)',
        fries: 79,
        friesColor: 'hsl(62, 70%, 50%)',
        donut: 151,
        donutColor: 'hsl(230, 70%, 50%)'
      },
      {
        country: 'AG',
        burger: 65,
        burgerColor: 'hsl(250, 70%, 50%)',
        sandwich: 83,
        sandwichColor: 'hsl(266, 70%, 50%)',
        kebab: 148,
        kebabColor: 'hsl(222, 70%, 50%)',
        fries: 178,
        friesColor: 'hsl(113, 70%, 50%)',
        donut: 147,
        donutColor: 'hsl(279, 70%, 50%)'
      },
      {
        country: 'AI',
        burger: 30,
        burgerColor: 'hsl(60, 70%, 50%)',
        sandwich: 111,
        sandwichColor: 'hsl(9, 70%, 50%)',
        kebab: 105,
        kebabColor: 'hsl(279, 70%, 50%)',
        fries: 106,
        friesColor: 'hsl(259, 70%, 50%)',
        donut: 154,
        donutColor: 'hsl(122, 70%, 50%)'
      },
      {
        country: 'AL',
        burger: 72,
        burgerColor: 'hsl(26, 70%, 50%)',
        sandwich: 118,
        sandwichColor: 'hsl(72, 70%, 50%)',
        kebab: 184,
        kebabColor: 'hsl(126, 70%, 50%)',
        fries: 28,
        friesColor: 'hsl(274, 70%, 50%)',
        donut: 133,
        donutColor: 'hsl(102, 70%, 50%)'
      },
      {
        country: 'AM',
        burger: 91,
        burgerColor: 'hsl(359, 70%, 50%)',
        sandwich: 16,
        sandwichColor: 'hsl(17, 70%, 50%)',
        kebab: 162,
        kebabColor: 'hsl(346, 70%, 50%)',
        fries: 183,
        friesColor: 'hsl(331, 70%, 50%)',
        donut: 119,
        donutColor: 'hsl(248, 70%, 50%)'
      }
    ]

    return (
      <ResponsiveBar
        data={data}
        width={900}
        height={500}
        keys={['burger', 'sandwich', 'kebab', 'fries', 'donut']}
        indexBy="country"
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
          legend: 'country',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'food',
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
    fetchTransactions: () => dispatch(fetchTransactions())
  }
}

export default connect(mapState, mapDispatch)(BarGraph)
