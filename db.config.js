const Pool = require('pg').Pool;
const pool = new Pool ({
    user:'postgres',
    host:'localhost',
    database:'Makeistan 1',
    password:'6266897',
    port:'5432'
});
module.exports = pool;
