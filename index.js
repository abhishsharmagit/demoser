require("dotenv").config();
var express = require("express");
var app = express();

//stup config//
const config = require("./config/config.json");
global.config = config;
//config end//

var port = process.env.PORT || config.http_port;
var router = require("./router/router")
var mysql = require("mysql")
var db = require("./db/conn")
var session = require("express-session")
var bcrypt = require('bcryptjs');
var redisClient = require('./db/redis')

// redis for storing the session

var redisconnect = require("connect-redis")(session);
//redis setup end//

var mysqlsession = require("connect-mysql")(session);
var cookieParser = require("cookie-parser")
app.use(cookieParser());
//logger start//
const logger = require('./utils/logger').getLogger("Index");
global.debugging = console.log;
var reqLogger = require("./requestLogger/index")
// logger end//


// parsing json start//
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//parsing middleware end//
app.use(reqLogger.APILogRequest)
app.use(reqLogger.APILogResponse)

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: "anything",
    //store: new mysqlsession(config.options),
    store: new redisconnect({ client: redisClient }),
}));



app.use(router);




app.listen(port, ()=>{
    logger.info(`server is runnning at ${port}`)
})