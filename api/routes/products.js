const express = require('express');
const responseHelper = require('../helpers.js/responseHelper');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res, next) => {
  const { page, limit } = req.query;
  try {
    const products = await Product.all({ page, limit });
    res.status(200).json(responseHelper({
      page,
      limit,
      total: products.length ? products[0].total : 0,
      data: products,
    }));
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const product = new Product(req.body.name, req.body.price);
  try {
    const result = await product.save();
    res.status(201).json(responseHelper({ data: result }));
  } catch (error) {
    next(error);
  }
});

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(responseHelper({
      data: product,
    }));
  } catch (error) {
    next(error);
  }
});

router.patch('/:productId', async(req, res, next) => {
  const { name, price } = req.body;
  try {
    const newProduct = await Product.update(req.params.productId, {
      name, price,
    })
    res.status(200).json(responseHelper({ data: newProduct }));
  } catch (error) {
    next(error);
  }
});

router.delete('/:productId', async(req, res, next) => {
  try {
    const deletedProduct = await Product.delete(req.params.productId);
    res.status(200).json(responseHelper({ data: deletedProduct }));
  } catch (error) {
    next(error);
  }
});

module.exports = router;