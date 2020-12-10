import React from 'react'
import axios from 'axios'
import {Button} from 'react-bootstrap'
import {addTransactionsThunk} from '../store/transactions'
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
    axios
      .post('/api/transactions', formData)
      .then(response => {
        alert('The file is successfully uploaded')
      })
      .catch(error => {
        console.log(error)
      })
    this.props.history.push('/transactions')
  }
  onChange(e) {
    this.setState({file: e.target.files[0]})
  }

  onInputChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    let newTransaction = {
      name: this.state.name,
      amount: (this.state.amount / 100).toFixed(2),
      category: this.state.category,
      date: this.state.date
    }
    this.props.addTransaction(newTransaction)
    this.props.history.push('/transactions')
  }

  render() {
    return (
      <div>
        <h2>Add Transactions</h2>
        <form onSubmit={this.onFormSubmit}>
          <h4>Take picture of receipt and upload</h4>
          <input type="file" name="image" onChange={this.onChange} />
          <Button variant="outline-success" type="submit">
            Upload
          </Button>
        </form>
        <br />
        <br />
        <h4>Manually add transactions</h4>
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
            Category
          </label>
          <input
            name="category"
            type="text"
            value={this.state.category}
            onChange={this.onInputChange}
          />
          <label className="thickfont" htmlFor="date">
            Date
          </label>
          <input
            name="date"
            type="text"
            value={this.state.date}
            onChange={this.onInputChange}
          />
          <Button variant="outline-success" type="submit">
            Submit
          </Button>
        </form>
      </div>
    )
  }
}
const mapDispatch = dispatch => {
  return {
    addTransaction: newTransaction =>
      dispatch(addTransactionsThunk(newTransaction))
  }
}
export default connect(null, mapDispatch)(AddTransaction)
