import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Hamburger from 'hamburger-react'

const Navbar = ({handleClick, isLoggedIn, user}) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <div>
      <h1>Kwantify</h1>
      <Hamburger toggled={isOpen} toggle={setOpen} direction="left" />
      {isOpen && (
        <nav>
          {isLoggedIn ? (
            <div className="burger">
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
              <Link to="/profile">Profile</Link>
              <Link to="/accounts">Accounts</Link>
              <Link to="/budgets">Budgets</Link>
              <Link to="/transactions">Transactions</Link>
            </div>
          ) : (
            <div className="burger">
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          )}
        </nav>
      )}

      <hr />
    </div>
  )
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
