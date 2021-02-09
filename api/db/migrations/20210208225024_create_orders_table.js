exports.up = (knex) => knex.schema.createTable("orders", (table) => {
  table.increments();
  table.integer("product_id").notNullable().index();
  table.integer("quantity").defaultTo(1);
  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTableIfExists("orders");
