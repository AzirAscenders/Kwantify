export default (month, category) => {
  const expense =
    month.reduce((accum, current) => {
      if (current.category === category) {
        accum += current.amount * 100
      }
      return accum
    }, 0) / 100
  if (expense < 0) {
    return 0
  }
  return expense
}
