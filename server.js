const express = require('express');
const morgan = require('morgan');

const productsRouter = require('./api/routes/products');
const ordersRouter = require('./api/routes/orders');

const port = process.env.PORT || 5000;
const app = express();


app.use(morgan('dev'));
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

// Handling not found error
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});
// Custom errors middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})
app.listen(port, () => console.log(`App running on ${port} 🎉`));