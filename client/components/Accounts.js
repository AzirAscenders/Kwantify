/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {fetchAllAccounts, loadAccounts} from '../store/accounts'
import {Carousel} from 'react-bootstrap'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import Loading from './Loading'

class Accounts extends React.Component {
  componentDidMount() {
    this.props.fetchAllAccounts()
  }

  componentWillUnmount() {
    this.props.loadAccounts()
  }

  render() {
    let issuer = ''
    let preview = true
    let image
    const loading = this.props.accounts.loading
    const accounts = this.props.accounts.accounts || []
    const bankName = accounts.map(
      account => account.institution.institutionName
    )
    const uniqueBankName = []
    for (let i = 0; i < bankName.length; i++) {
      if (!uniqueBankName.includes(bankName[i])) {
        uniqueBankName.push(bankName[i])
      }
    }

    if (loading) return <Loading />

    return (
      <div id="main-account">
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
            } else if (bank === 'American Express') {
              image = './institutionlogos/AMEX.png'
            }
            return (
              <div key={idx} id="bank-logo">
                <div className="logo-size">
                  <img src={image} /> <h2>{bank}</h2>
                </div>
                <div id="credit-card-container">
                  <Carousel interval={null}>
                    {accounts.map(account => {
                      if (account.institution.institutionName === bank) {
                        if (bank === 'Chase') {
                          issuer = 'visa'
                        } else if (bank === 'Bank of America') {
                          issuer = 'boa'
                        } else if (bank === 'Citi') {
                          issuer = 'citi'
                        } else if (bank === 'Capital One') {
                          issuer = 'capitalone'
                        } else if (bank === 'TD Bank') {
                          issuer = 'td'
                        } else if (bank === 'Wells Fargo') {
                          issuer = 'wellsfargo'
                        } else if (bank === 'American Express') {
                          issuer = 'amex'
                        }
                        return (
                          <Carousel.Item interval={null}>
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
                          </Carousel.Item>
                        )
                      }
                    })}
                  </Carousel>
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
    fetchAllAccounts: () => dispatch(fetchAllAccounts()),
    loadAccounts: () => dispatch(loadAccounts())
  }
}

export default connect(mapState, mapDispatch)(Accounts)
