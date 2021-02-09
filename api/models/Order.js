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

  static all = async ({ limit, page }) => {
    const result = await knex('orders').select().limit(limit).offset((page - 1) * limit);
    return result;
  }

  static findById = async  (orderId) => {
    const result = await knex('orders').where({ id: orderId });
    return result;
  }

  static remove = async (orderId) => {
    const result = await knex('orders').del().where({ id: orderId }).returning('*');
    return result;
  }
}