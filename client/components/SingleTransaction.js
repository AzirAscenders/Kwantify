/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {
  fetchSingleTransaction,
  addItemThunk,
  editTransactionItems
} from '../store/transactions'
import {Table, Button} from 'react-bootstrap'

class SingleTransaction extends React.Component {
  constructor() {
    super()
    this.state = {
      rows: [],
      transaction: {},
      editItem: false,
      add: false
    }

    this.handleClickAdd = this.handleClickAdd.bind(this)
    this.handleClickEditItem = this.handleClickEditItem.bind(this)
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

  async handleClickEditItem() {
    if (!this.state.editItem) {
      const rows = this.props.items.map(item => {
        const copy = {...item}
        copy.price = (copy.price / 100).toFixed(2)

        return copy
      })

      await this.setState({
        rows,
        transaction: this.props.singleTransaction,
        editItem: true
      })
    } else {
      await this.setState({rows: [], transaction: {}, editItem: false})
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
    if (this.state.add) {
      const updatedItems = [...this.state.rows].filter(
        (itemObj, index) => index !== idx
      )

      await this.setState({rows: updatedItems})

      if (!this.state.rows.length) await this.setState({add: false})
      console.log('DEL', this.state)
    }

    if (this.state.editItem) {
      const copy = [...this.state.rows]
      copy[idx].delete = true

      await this.setState({rows: copy})
      // await this.props.deleteTransactionItem(this.state.rows[idx])
      // await this.setState({rows: this.props.items})
      console.log('DELETE EDIT', this.state)
    }
  }

  async handleSubmitItem(e) {
    e.preventDefault()

    if (this.state.add) {
      this.props.addItemThunk(this.state.rows, this.props.singleTransaction.id)

      this.setState({rows: [], add: false})
    }

    if (this.state.editItem) {
      await this.props.editTransactionItems(this.state.rows)
      await this.setState({rows: [], editItem: false})

      console.log(this.state)
    }
  }

  render() {
    const transaction = this.props.singleTransaction
    const items = this.props.items
    let subTotal = 0
    if (transaction.subtotal) {
      subTotal = transaction.subtotal
    } else if (items) {
      for (let i = 0; i < items.length; i++) {
        subTotal += items[i].price
      }
    }
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
          disabled={this.state.add || this.state.editItem}
        >
          Edit Transaction
        </Button>
        <Button
          type="button"
          variant="outline-primary"
          onClick={this.handleClickAdd}
          disabled={this.state.editItem}
        >
          Add Item
        </Button>
        <Button
          type="button"
          variant="outline-primary"
          onClick={this.handleClickEditItem}
          disabled={this.state.add}
        >
          {this.state.editItem ? `Cancel Edit` : `Edit Item(s)`}
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
                {this.state.editItem
                  ? this.state.rows.map(
                      (item, idx) =>
                        !item.delete && (
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
                        )
                    )
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
                {(items.length || transaction.subtotal) && (
                  <tr>
                    <td>
                      <strong>Subtotal</strong>
                    </td>
                    {transaction.subtotal ? (
                      <td>
                        <strong>
                          $ {(transaction.subtotal / 100).toFixed(2)}
                        </strong>
                      </td>
                    ) : (
                      <td>
                        <strong>$ {(subTotal / 100).toFixed(2)}</strong>
                      </td>
                    )}
                  </tr>
                )}
                <tr>
                  <td>
                    <strong>Tax</strong>
                  </td>
                  {subTotal ? (
                    <td>
                      <strong>
                        $ {((transaction.amount - subTotal) / 100).toFixed(2)}
                      </strong>
                    </td>
                  ) : (
                    <td>
                      <strong>$ 0.00</strong>
                    </td>
                  )}
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>
                    <strong>$ {(transaction.amount / 100).toFixed(2)}</strong>
                  </td>
                </tr>
              </tbody>
            </Table>
            {(this.state.add || this.state.editItem) && (
              <Button type="submit" onClick={this.handleSubmitItem}>
                Submit
              </Button>
            )}
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
      dispatch(addItemThunk(items, transactionId)),
    editTransactionItems: items => dispatch(editTransactionItems(items))
  }
}

export default connect(mapState, mapDispatch)(SingleTransaction)
