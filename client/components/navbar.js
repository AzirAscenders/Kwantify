import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Hamburger from 'hamburger-react'
import {Navbar} from 'react-bootstrap'
import CreateLink from './create-link'

const NavBar = ({handleClick, isLoggedIn, user}) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <>
      <div id="nav-bar-container">
        {/* <Navbar fixed="top"> */}
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          direction="left"
          id="hamburger"
        />
        {isOpen && (
          <nav>
            {isLoggedIn ? (
              <div className="burger">
                {/* The navbar will show these links after you log in */}

                <div className="burger-top">
                  <Link to="/home">Home</Link>
                  <Link to="/profile">Profile</Link>
                  <Link to="/accounts">Accounts</Link>
                  <Link to="/budgets">Budgets</Link>
                  <Link to="/transactions">Transactions</Link>
                  <CreateLink />
                </div>

                <div className="burger-bottom">
                  <a href="#" onClick={handleClick}>
                    Logout
                  </a>
                </div>
              </div>
            ) : (
              <div className="burger">
                {/* The navbar will show these links before you log in */}
                <div className="burger-top">
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign Up</Link>
                </div>
              </div>
            )}
          </nav>
        )}
        <div>
          <img src="./kwantify.png" />
        </div>
        {/* </Navbar> */}
      </div>
    </>
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

export default connect(mapState, mapDispatch)(NavBar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
