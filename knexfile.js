import { config } from './src/store/config';

module.exports = {
  client: 'mysql2',
  connection: {
    host: config.env.proxyendpoint,
    user: config.env.dbUser,
    password: config.env.dbPassword,
    database: config.env.dbName,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    // tableName: 'knex_migrations',
    directory: `${__dirname}/db/migrations`,
    disableMigrationsListValidation: true,
  },
};

// module.exports = {
//   dev: {
//     client: 'mysql2',
//     connection: {
//       host: config.env.proxyendpoint,
//       user: config.env.dbUser,
//       password: config.env.dbPassword,
//       database: config.env.dbName,
//     },
//     pool: {
//       min: 2,
//       max: 10,
//     },
//     migrations: {
//       // tableName: 'knex_migrations',
//       directory: `${__dirname}/db/migrations`,
//       disableMigrationsListValidation: true,
//     },
//   },
//   prod: {
//     client: 'mysql2',
//     connection: {
//       host: config.env.proxyendpoint,
//       user: config.env.dbUser,
//       password: config.env.dbPassword,
//       database: config.env.dbName,
//     },
//     pool: {
//       min: 2,
//       max: 10,
//     },
//     migrations: {
//       tableName: 'knex_migrations',
//       directory: ['./db/migrations'],
//       disableMigrationsListValidation: false,
//     },
//   },
// };
