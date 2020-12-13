import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleTransaction, addItemThunk} from '../store/transactions'
import {Table, Button} from 'react-bootstrap'

class SingleTransaction extends React.Component {
  constructor() {
    super()
    this.state = {rows: [], transaction: {}, edit: false, add: false}

    this.handleClickAdd = this.handleClickAdd.bind(this)
    this.handleClickEdit = this.handleClickEdit.bind(this)
    this.handleSubmitItem = this.handleSubmitItem.bind(this)
    this.handleChangeItem = this.handleChangeItem.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    const transId = this.props.match.params.transId
    this.props.fetchSingleTransaction(transId)
  }

  async handleClickAdd() {
    await this.setState(prevState => {
      return {
        rows: [...prevState.rows, {name: '', price: '', quantity: ''}],
        add: true
      }
    })
    console.log('ADD', this.state)
  }

  async handleClickEdit() {
    if (!this.state.edit) {
      const rows = this.props.items.map(item => {
        const copy = {...item}
        copy.price = (copy.price / 100).toFixed(2)

        return copy
      })

      await this.setState({
        rows,
        transaction: this.props.singleTransaction,
        edit: true
      })
    } else {
      await this.setState({rows: [], transaction: {}, edit: false})
    }

    console.log('EDIT', this.state)
    console.log('EDIT2', this.props.items)
  }

  async handleChangeItem(e, idx) {
    let copy = [...this.state.rows]
    let itemObj = copy[+idx]

    itemObj[e.target.name] = e.target.value

    await this.setState({rows: copy})
    console.log('CHANGE', this.state)
  }

  async handleDelete(idx) {
    const updatedItems = [...this.state.rows].filter(
      (itemObj, index) => index !== idx
    )

    await this.setState({rows: updatedItems})

    if (!this.state.rows.length) await this.setState({add: false})
    console.log('DEL', this.state)
  }

  handleSubmitItem(e) {
    e.preventDefault()

    this.props.addItemThunk(this.state.rows, this.props.singleTransaction.id)

    this.setState({rows: [], add: false})
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
          onClick={this.handleClickAdd}
          disabled={this.state.edit}
        >
          Add Item
        </Button>
        <Button
          type="button"
          variant="outline-primary"
          onClick={this.handleClickEdit}
          disabled={this.state.add}
        >
          Edit Transaction / Item
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
                {this.state.edit
                  ? this.state.rows.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <input
                            name="name"
                            value={this.state.rows[idx].name}
                            type="text"
                            onChange={e => this.handleChangeItem(e, idx)}
                          />
                        </td>
                        <td>
                          <input
                            name="price"
                            value={this.state.rows[idx].price}
                            type="text"
                            onChange={e => this.handleChangeItem(e, idx)}
                          />
                        </td>
                        <td>
                          <input
                            name="quantity"
                            value={this.state.rows[idx].quantity}
                            type="text"
                            onChange={e => this.handleChangeItem(e, idx)}
                          />
                          <Button
                            onClick={() => this.handleDelete(idx)}
                            type="button"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  : items.map(item => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>$ {(item.price / 100).toFixed(2)}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                {this.state.add &&
                  this.state.rows.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <input
                          name="name"
                          value={this.state.rows[idx].name}
                          type="text"
                          onChange={e => this.handleChangeItem(e, idx)}
                        />
                      </td>
                      <td>
                        <input
                          name="price"
                          value={this.state.rows[idx].price}
                          type="text"
                          onChange={e => this.handleChangeItem(e, idx)}
                        />
                      </td>
                      <td>
                        <input
                          name="quantity"
                          value={this.state.rows[idx].quantity}
                          type="text"
                          onChange={e => this.handleChangeItem(e, idx)}
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
            <Button type="submit" onClick={this.handleSubmitItem}>
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
