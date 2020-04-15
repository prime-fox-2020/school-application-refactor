const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'schooldb1',
    password: 'hacktiv',
    port: 5432
})

module.exports = pool