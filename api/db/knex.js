/* eslint-disable no-console */
const knex = require("knex");
const knexfile = require("../../knexfile");

const env = process.env.NODE_ENV || "development";
const configOptions = knexfile[env];

const knexInstance = knex(configOptions);

knexInstance.raw("SELECT 1")
  .then(() => console.log("Postgres connected 🥰"))
  .catch((err) => {
    console.error("Postgres failed to connect 🥵");
    throw err;
  });

module.exports = knexInstance;
