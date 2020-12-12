import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleTransaction, addItemThunk} from '../store/transactions'
import {Table, Button} from 'react-bootstrap'

class SingleTransaction extends React.Component {
  constructor() {
    super()
    this.state = {rows: []}
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    const transId = this.props.match.params.transId
    this.props.fetchSingleTransaction(transId)
  }

  handleClick(e) {
    this.setState(prevState => {
      console.log(prevState)
      return {rows: [...prevState.rows, {name: '', price: '', quantity: ''}]}
    })
  }

  async handleChange(e, idx) {
    // console.log('targeeettt', e.target.name)

    // console.log('TYPE', e.target.type)
    let copy = [...this.state.rows]
    let itemObj = copy[+idx]
    itemObj[e.target.name] = e.target.value
    await this.setState({rows: copy})
    console.log(this.state.rows)
  }

  async handleDelete(idx) {
    const updatedItems = [...this.state.rows].filter(
      (itemObj, index) => index !== idx
    )
    await this.setState({rows: updatedItems})
    // console.log(this.state.rows)
  }

  async handleSubmit(e) {
    console.log('THIS IS RUNNING ')
    e.preventDefault()
    await this.props.addItemThunk(
      this.state.rows,
      this.props.singleTransaction.id
    )
    await this.setState({rows: []})
    console.log('rowsssss', this.state.rows)
  }
  render() {
    const transaction = this.props.singleTransaction
    const items = this.props.items
    return transaction.name ? (
      <div>
        <h3>Name: {transaction.name}</h3>
        <p>Date: {transaction.date}</p>
        <p>Amount: $ {(transaction.amount / 100).toFixed(2)}</p>
        <p>Category: {transaction.category}</p>
        <Button
          type="button"
          variant="outline-primary"
          onClick={this.handleClick}
        >
          Add Item
        </Button>
        {items && (
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody id="item-tbody">
                {items.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>$ {(item.price / 100).toFixed(2)}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
                {this.state.rows.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <input
                        name="name"
                        value={this.state.rows[idx].name}
                        type="text"
                        onChange={e => this.handleChange(e, idx)}
                      />
                    </td>
                    <td>
                      <input
                        name="price"
                        value={this.state.rows[idx].price}
                        type="text"
                        onChange={e => this.handleChange(e, idx)}
                      />
                    </td>
                    <td>
                      <input
                        name="quantity"
                        value={this.state.rows[idx].quantity}
                        type="text"
                        onChange={e => this.handleChange(e, idx)}
                      />
                      <Button
                        onClick={() => this.handleDelete(idx)}
                        type="button"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td>Subtotal</td>
                  <td>$ {(transaction.subtotal / 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Tax</td>
                  <td>
                    ${' '}
                    {(
                      (transaction.amount - transaction.subtotal) /
                      100
                    ).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>$ {(transaction.amount / 100).toFixed(2)}</td>
                </tr>
              </tbody>
            </Table>
            <Button type="submit" onClick={this.handleSubmit}>
              Submit
            </Button>
          </div>
        )}
      </div>
    ) : (
      <div>Loading...</div>
    )
  }
}

const mapState = state => {
  return {
    singleTransaction: state.transactions.singleTransaction,
    items: state.transactions.items
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleTransaction: transId =>
      dispatch(fetchSingleTransaction(transId)),
    addItemThunk: (items, transactionId) =>
      dispatch(addItemThunk(items, transactionId))
  }
}

export default connect(mapState, mapDispatch)(SingleTransaction)
