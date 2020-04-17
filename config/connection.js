const { Pool } = require('pg')

const pool = new Pool({
    user: 'rezarr',
    password: '123456',
    database: 'school-app',
    host: 'localhost',
    port: 5432
})

module.exports = pool