const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'You knocking on products GET route' });
});

router.post('/', (req, res, next) => {
  console.log(req)
  const product = {
    name: req.body.name,
    price: req.body.price,
  }
  res.status(201).json({
    message: 'You knocking on products POST route' ,
    product,
  });
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