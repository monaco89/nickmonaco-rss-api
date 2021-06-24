import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: {
    nodeEnv: process.env.NODE_ENV,
    secret: process.env.SECRET,
    originDomain: process.env.ORIGIN_DOMAIN || '*',
    port: process.env.PORT || 3306,
    proxyendpoint: process.env.PROXYENDPOINT || '127.0.0.1',
    dbUser: process.env.DBUSER,
    dbPassword: process.env.DBPASSWORD,
    dbName: process.env.DBNAME,
  },
};
