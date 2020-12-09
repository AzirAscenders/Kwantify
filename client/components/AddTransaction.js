import React from 'react'
import axios from 'axios'

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
  }
  onFormSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', this.state.file)
    // console.log(formData)
    // const config = {
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //   },
    // }
    axios
      .post('/api/transaction', formData)
      .then(response => {
        alert('The file is successfully uploaded')
      })
      .catch(error => {
        console.log(error)
      })
  }
  onChange(e) {
    this.setState({file: e.target.files[0]})
  }

  onInputChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  // handleSubmit(e){

  // }
  render() {
    return (
      <div>
        <h2>Add Transactions</h2>
        <form onSubmit={this.onFormSubmit}>
          <h4>Take picture of receipt and upload</h4>
          <input type="file" name="image" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form>
        <br />
        <br />
        <h4>Manually add transactions</h4>
        <form onSubmit={this.submitForm}>
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
        </form>
      </div>
    )
  }
}

export default AddTransaction
