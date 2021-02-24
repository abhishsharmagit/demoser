
var express = require("express");
var app = express();
const config = require("./config/config.json");
global.config = config;
var port = process.env.PORT || config.http_port;
var router = require("./router/router")
var mysql = require("mysql")
var db = require("./db/conn")
var session = require("express-session")
var mysqlsession = require("connect-mysql")(session);
var cookieParser = require("cookie-parser")
const logger = require('./utils/logger').getLogger("Index");
global.debugging = console.log;
var reqLogger = require("./requestLogger/index")

var options = {
    config: {
        user : "root",
        password : "root",
        database : "demoserver" 
    }
  }
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(reqLogger.APILogRequest)
app.use(reqLogger.APILogResponse)
app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "anything",
    store: new mysqlsession(options)
}));



app.use(router);




app.listen(port, ()=>{
    logger.info(`server is runnning at ${port}`)
})