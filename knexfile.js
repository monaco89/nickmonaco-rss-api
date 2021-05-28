import knex from 'knex';
import { config } from './src/store/config';

const dbConfig = {
    local: {
        client: 'mysql2',
        connection: {
            debug: true,
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
            tableName: 'knex_migrations',
            directory: ['./db/migrations'],
            disableMigrationsListValidation: true,
        },
    },
    prod: {
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
            tableName: 'knex_migrations',
            directory: ['./db/migrations'],
            disableMigrationsListValidation: false,
        },
    },
};

const database = knex(dbConfig.local);

export default database;
