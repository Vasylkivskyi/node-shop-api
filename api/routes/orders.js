const express = require('express');
const responseHelper = require('../helpers.js/responseHelper');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Orders were fetched'});
});

router.post('/', async (req, res, next) => {
  const product = await Product.findById(req.body.productId);
  if (!product.length) {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
  } else {
    const order = new Order(product[0].id, req.body.quantity)
    try {
      const savedOrder = await order.save();
      res.status(201).json(responseHelper({ data: savedOrder }));
    } catch (error) {
      next(error);
    }
  }
});

router.get('/:orderId', (req, res, next) => {
  res.status(200).json({
    message: `You received order with id: ${req.params.orderId}`,
  });
});

router.delete('/:orderId', (req, res, next) => {
  res.status(200).json({ message: `You deleted order with id: ${req.params.orderId}`});
});

module.exports = router;