import React from 'react'
import {connect} from 'react-redux'
import {thunkEditUser} from '../store/user'
import {Button} from 'react-bootstrap'

class UserProfile extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      imageUrl: '',
      toggling: false
    }
    this.toggleInput = this.toggleInput.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.setState({
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      imageUrl: this.props.user.imageUrl
    })
  }
  toggleInput() {
    if (!this.state.toggling) {
      this.setState({toggling: true})
    } else {
      this.setState({toggling: false})
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.updateUser(this.state)
    this.setState({toggling: false})
  }
  render() {
    const {imageUrl, firstName, lastName, email} = this.props.user
    return (
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <h2>Profile</h2>
          </div>
          <img src={imageUrl} />
          <div className="profile-hero-info-container">
            <div className="profile-hero-info-field">
              <h6>Name</h6>
              {`${firstName} ${lastName}`}
            </div>
            <div className="profile-hero-info-field">
              <h6>Email</h6>
              {email}
            </div>
          </div>
          <Button
            variant="outline-primary"
            type="button"
            onClick={this.toggleInput}
          >
            Edit User Info
          </Button>
          {this.state.toggling && (
            <form className="profile-form" onSubmit={e => this.handleSubmit(e)}>
              <label className="thickfont" htmlFor="firstName">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
              <label className="thickfont" htmlFor="lastName">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
              <label className="thickfont" htmlFor="email">
                Email
              </label>
              <input
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <label className="thickfont" htmlFor="imageUrl">
                Image Url
              </label>
              <input
                name="imageUrl"
                type="text"
                value={this.state.imageUrl}
                onChange={this.handleChange}
              />
              <Button variant="outline-primary" type="submit">
                {' '}
                Submit{' '}
              </Button>
            </form>
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: changedState => dispatch(thunkEditUser(changedState))
  }
}
export default connect(mapState, mapDispatch)(UserProfile)
