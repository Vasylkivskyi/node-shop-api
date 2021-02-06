
exports.up = (knex) =>
  knex.schema.createTable("products", table => {
    table.increments();
    table.string("name").notNullable();
    table.float("price").notNullable();
    table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTableIfExists("products");

