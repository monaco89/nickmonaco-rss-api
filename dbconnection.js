import { config } from './src/store/config';
require('mysql2');

const minNum = process.env.ENV === 'local' ? 0 : 20;
const maxNum = process.env.ENV === 'local' ? 10 : 100;
const idleTimout = process.env.ENV === 'local' ? 1000 : 30000;

const dbContext = require('knex')({
  client: 'mysql2',
  connection: {
    host: config.env.proxyendpoint,
    user: config.env.dbUser,
    password: config.env.dbPassword,
    database: config.env.dbName,
  },
  pool: {
    min: minNum,
    max: maxNum,
    createTimeoutMillis: 30000,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: idleTimout,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
    propagateCreateError: true,
  },
  debug: true,
});

export default dbContext;
