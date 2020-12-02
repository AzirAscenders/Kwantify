import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import {VictoryPie, VictoryLabel} from 'victory'
import {Pie} from '@nivo/pie'
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
      {id: 'Travel', label: 'Travel', value: 227},
      {id: 'HealthCare', label: 'HealthCare', value: 349},
      {id: 'Shopping', label: 'Shopping', value: 526},
      {id: 'Groceries', label: 'Groceries', value: 326},
      {id: 'Food & Drink', label: 'Food & Drink', value: 564},
      {id: 'Entertainment', label: 'Entertainment', value: 159}
    ]
    return (
      <div>
        <h3>Welcome, {email}</h3>
        <CreateLink />
        <Pie
          data={sampleData}
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
          radialLabelsLinkDiagonalLength={24}
          radialLabelsTextXOffset={7}
          radialLabelsLinkHorizontalLength={29}
          sliceLabelsTextColor="#333333"
          radialLabelsLinkColor={{from: 'color', modifiers: []}}
          radialLabelsLinkStrokeWidth={2}
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
