export default (month, category) => {
  return (
    month.reduce((accum, current) => {
      if (current.category[0] === category) {
        accum += current.amount * 100
      }
      return accum
    }, 0) / 100
  )
}