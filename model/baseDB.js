const mysql = require('mysql');

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'itcast30',
    multipleStatements : true
})


//导出 connection 
module.exports = connection