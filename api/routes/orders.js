const express = require('express');
const responseHelper = require('../helpers.js/responseHelper');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

router.get('/', async (req, res, next) => {
  const { page, limit } = req.query;
  try {
    const orders = await Order.all({ page, limit });
    res.status(200).json(responseHelper({
      page,
      limit,
      total: orders.length ? orders[0].total : 0,
      data: orders
     }))
  } catch (error) {
    next(error);
  }
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

router.get('/:orderId', async (req, res, next) => {
  console.log('main')
  try {
    const ordersData = Order.findById(req.params.orderId);
    if (ordersData.length) {
      res.status(200).json(responseHelper({ data: ordersData.shift() }));
    } else {
      const error = new Error('Not found');
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:orderId', async (req, res, next) => {
  try {
    const result = await Order.remove(req.params.orderId);
    res.status(200).json(responseHelper({data: result[0]}));
  } catch (error) {
    next(error)
  }
});

module.exports = router;