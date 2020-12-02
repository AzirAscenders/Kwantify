import React from 'react'
import {connect} from 'react-redux'
import {fetchAllAccounts} from '../store/accounts'

class Accounts extends React.Component {
  componentDidMount() {
    this.props.fetchAllAccounts(this.props.user.id)
  }

  render() {
    const accounts = this.props.accounts || []
    const bankName = accounts.map(
      account => account.institution.institutionName
    )
    const uniqueBankName = []
    for (let i = 0; i < bankName.length; i++) {
      if (!uniqueBankName.includes(bankName[i])) {
        uniqueBankName.push(bankName[i])
      }
    }

    return (
      <div>
        {accounts.length ? (
          uniqueBankName.map((bank, idx) => (
            <div key={idx}>
              <h2>{bank}</h2>
              {accounts.map(account => {
                if (account.institution.institutionName === bank) {
                  return <div key={account.id}>{account.name}</div>
                }
              })}
            </div>
          ))
        ) : (
          <div>Loading</div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    accounts: state.accounts,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllAccounts: userId => dispatch(fetchAllAccounts(userId))
  }
}

export default connect(mapState, mapDispatch)(Accounts)
