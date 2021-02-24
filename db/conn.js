'use strict';
const { configure } = require("log4js");
var mysql = require("mysql2/promise")
var config = require("../config/config.json")
// var db = mysql.createConnection({
//     host : "localhost",
//     user : "root",
//     password : "root",
//     database : "demoserver"
// });

// db.connect(function(err) {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//     }   
// });
var pool;
const sqlOptions = {
    connectionLimit: 20, //important
    host : config.db.db_host,
    user : config.db.db_user,
    password : config.db.db_password,
    database : config.db.db_name,
    port: 3306,
    multipleStatements: true,
    supportBigNumbers: true,
    bigNumberStrings: true,
    dateStrings: true,
    waitForConnections: true,
    queueLimit: 0,
}

try {
    pool = mysql.createPool(sqlOptions);
} catch (error) {
    logger.error("Connection Pool Error : ", error);
}


module.exports = pool;