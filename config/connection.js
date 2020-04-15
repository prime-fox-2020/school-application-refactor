const { Pool } = require('pg')

const pg = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'LC',
    password: 'postgres',
    port: 5432,
})

module.exports = pg;