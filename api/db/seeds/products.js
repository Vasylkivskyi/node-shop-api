exports.seed = (knex) => knex("products").del()
  .then(() => knex("products").insert([
    { name: "Laptop", price: 999.00 },
    { name: "Phone", price: 799.00 },
    { name: "Player", price: 99.00 },
  ]));
