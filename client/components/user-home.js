import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {VictoryPie, VictoryLabel} from 'victory'
import {fetchLink} from '../store/link'
import CreateLink from './create-link'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  componentDidMount() {
    this.props.fetchLink()
  }

  render() {
    const {email} = this.props
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
        <CreateLink />
        <VictoryPie
          padAngle={5}
          innerRadius={20}
          radius={50}
          colorScale={[
            'rgb(119,203,255)',
            'rgb(255,132,132)',
            'rgb(188,126,164)',
            'rgb(131,186,176)',
            'rgb(255,168,65)',
            'rgb(197,197,197)'
          ]}
          data={sampleData}
          // width={400}
          // height={400}
          //style={{labels: {fontSize: 10}}}
          style={{labels: {fontSize: 5, fill: 'red'}}}
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
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    fetchLink: () => dispatch(fetchLink())
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
