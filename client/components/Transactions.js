import React from 'react'
import {Table} from 'react-bootstrap'

const Transactions = props => {
  const transactions = props.transactions
  console.log(transactions)
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Name</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
      </Table>
    </div>
  )
}

export default Transactions
