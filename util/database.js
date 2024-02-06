const mysql = require('mysql2');


const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    port:3307,
    database:'appcompare',
    password:'MJm198219##'
});

module.exports = pool.promise(); //call it in index