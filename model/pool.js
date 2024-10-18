const { Pool } = require('pg');

module.exports = new Pool({
    host: "localhost",
    user: process.env.USERNAME,
    database: "top_users",
    password: process.env.PASSWORD,
    port: 5432
});