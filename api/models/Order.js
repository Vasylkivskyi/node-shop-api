const knex = require('../db/knex');

module.exports = class Order {
  constructor(productId, quantity){
    this.productId = productId,
    quantity = quantity
  }

  save = async () => {
    const result = await knex('orders').insert({
      product_id: this.productId,
      quantity: this.quantity,
    }).returning('*');
    return result;
  }
}