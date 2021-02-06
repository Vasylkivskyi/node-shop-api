const knex = require('../db/knex');

module.exports = function(name, price) {
  this.name = name;
  this.price = price;

  this.save = async () => {
    const result = await knex('products')
      .insert({ name: this.name, price: this.price })
      .returning('*');

    return result;
  }

  this.get = async () => {

  }
}