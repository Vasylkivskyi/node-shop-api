const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const Product = require('../models/product');

router.get('/', async (req, res, next) => {
  const products = await knex('products');
  res.status(200).json({ data: products });
});

router.post('/', async (req, res, next) => {
  const product = new Product(req.body.name, req.body.price);
  try {
    const result = await product.save();
    res.status(201).json({
      message: 'Product was saved' ,
      data: result,
    });
  }
  catch(err) {
    console.log(err)
    res.status(500)
    throw new Error(err.message)
  }
})

router.get('/:productId', (req, res, next) => {
  res.status(200).json({
    'message': `You are requesting for product with id: ${req.params.productId}`
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
  })
})

module.exports = router;