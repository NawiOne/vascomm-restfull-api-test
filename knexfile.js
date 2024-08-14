// import dotenv module
require('dotenv').config();

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD
        },
        ssl: {
            rejectUnauthorized: false,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: 'db/migrations',
        },
        seeds: {
            directory: 'db/seeds',
        },
    },
};
