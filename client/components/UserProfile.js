import React from 'react'
import {connect} from 'react-redux'

class UserProfile extends React.Component {
  render() {
    const {imageUrl, firstName, lastName, email} = this.props.user
    return (
      <div>
        <img src={imageUrl} />
        <p>First Name: {firstName} </p>
        <p>Last Name: {lastName} </p>
        <p>Email: {email} </p>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState, null)(UserProfile)
