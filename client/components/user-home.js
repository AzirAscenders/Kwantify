import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {VictoryPie, VictoryLabel} from 'victory'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  const sampleData = [
    {x: 'Travel', y: 10},
    {x: 'HealthCare', y: 20},
    {x: 'Shopping', y: 30},
    {x: 'Groceries', y: 10},
    {x: 'Food & Drink', y: 20},
    {x: 'Entertainment', y: 10}
  ]
  return (
    <div>
      <h3>Welcome, {email}</h3>
      <VictoryPie
        padAngle={10}
        innerRadius={20}
        radius={50}
        data={sampleData}
        // width={400}
        // height={400}
        //style={{labels: {fontSize: 10}}}
        style={{labels: {fontSize: 5, fill: 'red'}}}
      />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
