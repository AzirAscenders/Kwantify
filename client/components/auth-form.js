import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Button} from 'react-bootstrap'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <img className="wave" src="./wave.png" />
      <div className="container">
        <div className="img">
          <img src="./loginTest8.svg" />
        </div>
        <form
          className="login-form-container"
          onSubmit={handleSubmit}
          name={name}
        >
          {name === 'signup' && (
            <div className="signup-field-container">
              <h3>SIGN UP</h3>
              <div className="input-field">
                <label htmlFor="firstName">
                  <p>First Name </p>
                </label>
                <input name="firstName" type="text" />
              </div>
              <div className="input-field">
                <label htmlFor="lastName">
                  <p>Last Name </p>
                </label>
                <input name="lastName" type="text" />
              </div>
              <div className="input-field">
                <label htmlFor="email">
                  <p>Email </p>
                </label>
                <input name="email" type="text" />
              </div>
              <div className="input-field">
                <label htmlFor="password">
                  <p>Password </p>
                </label>
                <input name="password" type="password" />
              </div>
              <div>
                <Button variant="outline-primary" type="submit">
                  {displayName}
                </Button>
              </div>
              <a href="/auth/google">{displayName} with Google</a>
            </div>
          )}
          {name === 'login' && (
            <div className="signup-field-container">
              <h3>WELCOME</h3>
              <div className="input-field">
                <label htmlFor="email">
                  <p>Email </p>
                </label>
                <input name="email" type="text" />
              </div>
              <div className="input-field">
                <label htmlFor="password">
                  <p>Password </p>
                </label>
                <input name="password" type="password" />
              </div>
              <div>
                <button className="btn" type="submit">
                  {displayName}
                </button>
              </div>
              <a href="/auth/google">{displayName} with Google</a>
            </div>
          )}
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const formDataObj = {
        email: evt.target.email.value,
        password: evt.target.password.value
      }
      if (formName === 'signup') {
        formDataObj.firstName = evt.target.firstName.value
        formDataObj.lastName = evt.target.lastName.value
      }
      dispatch(auth(formDataObj, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
