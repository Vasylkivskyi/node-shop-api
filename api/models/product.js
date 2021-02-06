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

  static findById = async (productId) => {
    const result = await knex('products').select('*').where({ id: productId });
    return result;
  }

  static all = async({ page = 1, limit = 8 }) => {
    const result = await knex('products').select([
      'id',
      'name',
      'created_at',
      'updated_at',
      knex.raw('COUNT(*) OVER() AS total')
    ]).limit(limit)
    .offset((page - 1) * limit)
    .groupBy('id');
    return result;
  }

  static update = async(productId, updateDataObject) => {
    const result = await knex('products')
      .update(updateDataObject)
      .where({ id: productId })
      .returning('*');
    return result;
  }

  static remove = async(productId) => {
    const result = await knex('products')
      .where({ id: productId })
      .del()
      .returning('*');
    return result;
  }
}