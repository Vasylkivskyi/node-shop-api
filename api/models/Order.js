const knex = require("../db/knex");

module.exports = class Order {
  constructor(productId, quantity) {
    this.productId = productId;
    this.quantity = quantity;
  }

  async save() {
    const result = await knex("orders")
      .insert({
        product_id: this.productId,
        quantity: this.quantity,
      })
      .returning("*");
    return result;
  }

  static async all({ limit, page }) {
    const result = await knex("orders as o")
      .select([
        "o.id",
        "o.quantity",
        "p.id as product_id",
        "p.price",
        "o.created_at",
      ])
      .innerJoin("products as p", "p.id", "o.product_id")
      .limit(limit)
      .offset((page - 1) * limit);
    return result;
  }

  static async findById(orderId) {
    const result = await knex("orders as o")
      .select([
        "o.id",
        "o.quantity",
        "p.id as product_id",
        "p.price",
        "o.created_at",
      ])
      .leftJoin("products as p", "p.id", "o.product_id")
      .where("o.id", orderId);
    return result;
  }

  static async remove(orderId) {
    const result = await knex("orders")
      .del()
      .where({ id: orderId })
      .returning("*");
    return result;
  }
};
