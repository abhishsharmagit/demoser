var db = require("../db/db_shim");
const logger = require('../utils/logger').getLogger("model/user.js");

// model for user login, registratioin etc.

const user = {
    registerUser: async function (username, email, password){
        return new Promise((resolve, reject)=>{
            const registerQuery = db.format(
                `INSERT INTO tbl_user (username, email, password)
            VALUES (?, ?, ?)`,
          [username, email, password]
              );
              logger.debug("registerQuery", registerQuery)
              db.query(registerQuery, true)
              .then((result)=>{
                  return resolve(result);
              }).catch((error)=>{
                  logger.error(error);
                  return reject(error);
              })
        })
    },

    loginUser: async function (username){
        return new Promise((resolve, reject)=>{
            const loginQuery = db.format(
                `SELECT username, password FROM tbl_user WHERE username = ?`,
          [username]
              );
              logger.debug("loginQuery", loginQuery)
              db.query(loginQuery, true)
              .then((result)=>{
                  return resolve(result);
              }).catch((error)=>{
                  logger.error(error);
                  return reject(error);
              })
        })
    },

    forgotPassword: async function (email){
        return new Promise((resolve, reject)=>{
            const forgotQuery = db.format(
                `SELECT * FROM tbl_user WHERE email = ?`,
          [email]
              );
              logger.debug("forgotQuery", forgotQuery)
              db.query(forgotQuery, true)
              .then((result)=>{
                  return resolve(result);
              }).catch((error)=>{
                  logger.error(error);
                  return reject(error);
              })
        })
    },

    updatePassword: async function (password, email){
        return new Promise((resolve, reject)=>{
            const updateQuery = db.format(
                `UPDATE tbl_user SET password = ? WHERE email = ? `,
          [password, email]
              );
              logger.debug("updateQuery", updateQuery)
              db.query(updateQuery, true)
              .then((result)=>{
                  return resolve(result);
              }).catch((error)=>{
                  logger.error(error);
                  return reject(error);
              })
        })
    }
}



module.exports = user;