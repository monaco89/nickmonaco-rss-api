import { config } from './src/store/config';
require('mysql2');

const minNum = process.env.ENV === 'dev' ? 0 : 20;
const maxNum = process.env.ENV === 'dev' ? 10 : 100;
const idleTimout = process.env.ENV === 'dev' ? 1000 : 30000;

const dbContext = require('knex')({
  client: 'mysql2',
  connection: {
    host: config.env.proxyendpoint,
    user: config.env.dbUser,
    password: config.env.dbPassword,
    database: config.env.dbName,
    // port: config.env.port,
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
  debug: false,
});

export default dbContext;
