require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      directory: './api/db/migrations',
    },
    seeds: { directory: './api/db/seeds' },
  },

  testing: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      directory: './api/db/migrations',
    },
    seeds: { directory: './api/db/seeds' },
  },

  production: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      directory: './api/db/migrations',
    },
    seeds: { directory: './api/db/seeds' },
  },
};


