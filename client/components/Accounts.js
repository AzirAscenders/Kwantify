import React from 'react'
import {connect} from 'react-redux'
import {fetchAllAccounts} from '../store/accounts'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'

class Accounts extends React.Component {
  componentDidMount() {
    this.props.fetchAllAccounts()
  }

  render() {
    let issuer = ''
    let preview = true
    let image
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
    console.log(bankName)
    return (
      <div id="main">
        {accounts.length ? (
          uniqueBankName.map((bank, idx) => {
            if (bank === 'Bank of America') {
              image = './institutionlogos/BOA.png'
            } else if (bank === 'Chase') {
              image = './institutionlogos/chase.png'
            } else if (bank === 'Citi') {
              image = './institutionlogos/Citi.png'
            } else if (bank === 'Capital One') {
              image = './institutionlogos/Capital_One.png'
            } else if (bank === 'TD Bank') {
              image = './institutionlogos/TD.png'
            } else if (bank === 'Wells Fargo') {
              image = './institutionlogos/Wells_Fargo.png'
            }
            return (
              <div key={idx} id="bank-logo">
                <span className="logo-size">
                  <img src={image} /> <h2>{bank}</h2>
                </span>
                <div id="credit-card-container">
                  {accounts.map(account => {
                    if (account.institution.institutionName === bank) {
                      if (bank === 'Chase') {
                        issuer = 'visa'
                      } else if (bank === 'Bank of America') {
                        issuer = 'mastercard'
                      } else {
                        issuer = ''
                      }
                      return (
                        <div key={account.id} id="credit-card">
                          {' '}
                          <Cards
                            preview={preview}
                            issuer={issuer}
                            cvc="123"
                            expiry=""
                            name={account.name.slice(6)}
                            number="XXXX XXXX XXXX XXXX"
                          />
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
            )
          })
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
    fetchAllAccounts: () => dispatch(fetchAllAccounts())
  }
}

export default connect(mapState, mapDispatch)(Accounts)
