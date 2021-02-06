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

  get = async () => {
    return null
  }
}