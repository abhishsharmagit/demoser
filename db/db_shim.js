'use strict';

var pool = require('./conn');
const mysql = require('mysql2');

/**
 * Executes SQL query and returns data.
 * @constructor
 * @param {string} queryText - SQL query string
 * @param {boolean} singleRecord - single record
 */
const query = async function (queryText, singleRecord) {
    const [results] = await pool.query(queryText);
    if (Array.isArray(results)) {
        const finalResults = [];
        const resultsLength = results.length;
        for (let index = 0; index < resultsLength; index++) {
            finalResults.push({ ...results[index] });
        }
        // For single record
        if (typeof (singleRecord) == "boolean" && singleRecord) return finalResults[0];
        // For multiple records
        return finalResults;
    }
    return results;
};

/**
 * shim for formatting the query
 */
var format = mysql.format;

/**
 * escaping the data
 */
var escape = mysql.escape;

module.exports = {
    dbPool: pool,
    query,
    format,
    escape
};