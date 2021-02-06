
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        { name: "Laptop", price: 999.00 },
        { name: "Phone", price: 799.00 },
        { name: "Player", price: 99.00 },
      ]);
    });
};

