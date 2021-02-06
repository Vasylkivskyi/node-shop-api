module.exports = ({ data = [], limit, page, error, total }) => {
  return {
    metadata: {
      total,
      page,
      limit,
    },
    data
  }
}