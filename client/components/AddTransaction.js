import React from 'react'
import {Button} from 'react-bootstrap'
import {
  addTransactionsThunk,
  addReceiptTransaction
} from '../store/transactions'
import {connect} from 'react-redux'

class AddTransaction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      name: '',
      amount: '',
      category: '',
      date: ''
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  onFormSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', this.state.file)
    this.props
      .addReceiptTransaction(formData)
      .then(() => {
        alert('The file is successfully uploaded')
      })
      .then(() => this.props.history.push('/transactions'))
  }
  onChange(e) {
    this.setState({file: e.target.files[0]})
  }

  onInputChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    let newTransaction = {
      name: this.state.name,
      amount: this.state.amount,
      category: this.state.category,
      date: this.state.date
    }
    this.props
      .addTransaction(newTransaction)
      .then(() => {
        alert('You have succesfully added new transaction')
      })
      .then(() => this.props.history.push('/transactions'))
  }

  render() {
    return (
      <div id="main-add">
        <div className="add-transaction">
          <h2 className="center">Receipt Upload</h2>
          <form className="receipt-form" onSubmit={this.onFormSubmit}>
            <input type="file" name="image" onChange={this.onChange} />
            <Button
              variant="outline-success"
              type="submit"
              disabled={!this.state.file}
            >
              Upload
            </Button>
          </form>
        </div>
        <br />
        <br />
        <div className="add-transaction">
          <h2>Manual Upload</h2>
          <form onSubmit={e => this.handleSubmit(e)}>
            <label className="thickfont" htmlFor="name">
              Name
            </label>
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.onInputChange}
            />
            <label className="thickfont" htmlFor="amount">
              Amount
            </label>
            <input
              name="amount"
              type="text"
              value={this.state.amount}
              onChange={this.onInputChange}
            />
            <label className="thickfont" htmlFor="category">
              Choose a Category:
            </label>
            <select name="category" onChange={this.onInputChange}>
              <option name="category" value="Select Category">
                Select Category
              </option>
              <option name="category" value="Food and Drink">
                Food and Drink
              </option>
              <option name="category" value="Recreation">
                Entertainment
              </option>
              <option name="category" value="Healthcare">
                Healthcare
              </option>
              <option name="category" value="Shops">
                Shopping
              </option>
              <option name="category" value="Travel">
                Travel
              </option>
              <option name="category" value="Groceries">
                Groceries
              </option>
            </select>
            <label className="thickfont" htmlFor="date">
              Date
            </label>
            <input
              name="date"
              type="text"
              value={this.state.date}
              onChange={this.onInputChange}
              placeholder="YYYY-MM-DD"
            />
            <br />
            <div>
              <Button
                variant="outline-success"
                type="submit"
                disabled={
                  !this.state.name &&
                  !this.state.amount &&
                  !this.state.category &&
                  !this.state.date
                }
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
const mapDispatch = dispatch => {
  return {
    addTransaction: newTransaction =>
      dispatch(addTransactionsThunk(newTransaction)),
    addReceiptTransaction: newTransaction =>
      dispatch(addReceiptTransaction(newTransaction))
  }
}
export default connect(null, mapDispatch)(AddTransaction)
