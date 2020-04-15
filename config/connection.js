const {Pool} = require('pg');

const pool = new Pool({
    user: "postgres",
    password: "ArtiHidup102938",
    database: "postgres",
    host: "localhost",
    port: 5432,
});

module.exports = pool;