import React from 'react'
import {connect} from 'react-redux'
import {PlaidLink} from 'react-plaid-link'
import axios from 'axios'
import {generateLinkTransactions} from '../store/link-transactions'

class CreateLink extends React.Component {
  render() {
    return (
      <div>
        {this.props.link.link_token && (
          <PlaidLink
            token={this.props.link.link_token}
            onSuccess={(
              public_token,
              metadata
              // {institution, accounts, link_session_id}
            ) =>
              this.props.generateLinkTransactions(
                public_token,
                this.props.user.id,
                metadata
                // {institution, accounts, link_session_id}
              )
            }
          >
            Connect a bank account
          </PlaidLink>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    link: state.link,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    generateLinkTransactions: (public_token, userId, metadata) =>
      dispatch(generateLinkTransactions(public_token, userId, metadata))
  }
}

export default connect(mapState, mapDispatch)(CreateLink)
