'use strict';
const log4js = require('log4js');
const configs = require('config')
const config = require("../config/config.json");
var logger;
/**
 * return the logger object
 * @param {String} moduleName
 */
var getLogger = function (moduleName) {
    logger = log4js.getLogger(`${moduleName}`);
    // Fallback
    logger.level = config.loggerLevel;
    return logger;
};

module.exports = {
    getLogger
};