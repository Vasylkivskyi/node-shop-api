const knex = require('./knex');

(async () => {
  await knex.raw('DROP SCHEMA IF EXISTS public CASCADE;');
  await knex.raw('CREATE SCHEMA public;');

  console.log('-------DROPED--PG--------');

  process.exit(0);
})();