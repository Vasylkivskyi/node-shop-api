const knex = require('../db/knex');

module.exports = class Product {
  constructor (name, price) {
    this.name = name;
    this.price = price;
  }

  save = async () => {
    const result = await knex('products')
      .insert({ name: this.name, price: this.price })
      .returning('*');

    return result;
  }

  static get = async (productId) => {
    const result = await knex('products').select('*').where({ id: productId });
    return result;
  }

  static getAll = async ({ page = 1, limit = 8 }) => {
    const result = await knex('products').select('*').limit(limit).offset((page - 1) * limit);
    return result;
  }
}