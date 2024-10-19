const { Pool } = require('pg');

const config = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port:5432
}

if (process.env.DATABASE_HOST != 'localhost') {
    config.ssl = 'require'
}

module.exports = new Pool(config);