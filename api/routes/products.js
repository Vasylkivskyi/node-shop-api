const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res, next) => {
  const products = await Product.getAll({ page: req.query.page, limit: req.query.limit });
  res.status(200).json({ data: products });
});

router.post('/', async (req, res, next) => {
  const product = new Product(req.body.name, req.body.price);
  const result = await product.save();
  res.status(201).json({
    message: 'Product was saved' ,
    data: result,
  });
});

router.get('/:productId', async (req, res, next) => {
  const product = await Product.get(req.params.productId);
  res.status(200).json({
    'message': `You are requesting for product with id: ${req.params.productId}`,
    data: product,
  });
});

router.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    'message': `Updated product with id: ${req.params.productId}`
  });
});

router.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    'message': `Deleted product with id: ${req.params.productId}`
  });
});

module.exports = router;