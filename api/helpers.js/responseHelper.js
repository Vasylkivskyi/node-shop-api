module.exports = ({
  data = [], limit, page, total,
}) => ({
  metadata: {
    total,
    page,
    limit,
  },
  data,
});
