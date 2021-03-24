const logger = require('../utils/logger').getLogger("controller/user.js");
const userModel = require("../model/user")
var bcrypt = require('bcryptjs');
const {signAccessToken, signRefreshToken, verifyRefreshToken} = require("../utils/jwt")
const redisClient = require("../db/redis")

const register = async function (req, res){
    try{
     let {
         username, email, password
     } = req.body;
     var hash = await bcrypt.hash(password, 10)
     let registeration = await userModel.registerUser(username, email, hash);
     
 
     return res.json({
         success:"true",
         message: "successfully registered"
     })
    } catch(error){
         logger.error(error);
         return res.json({
             success: "false",
             message: error
         })
    }
 }

const login = async function (req, res){
    try{
        let {
            username, password
        } = req.body;
    
        let login = await userModel.loginUser(username);
        if(login){
            const validPass = await bcrypt.compare(password, login.password);
            if(req.sess && validPass){
                req.session.isAuth = true;

                return res.json({
                    success:"true",
                    message: "Successfully Logged in",
                })
                
            }else{
                if(validPass){
                    const accessToken = await signAccessToken(username);
                    const refreshToken = await signRefreshToken(username);
    
                    return res.json({
                        success:"true",
                        message: "Successfully Logged in",
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    })
                }else{
                    throw "wrong Inputs"
                }
            }
           
            
        }else{
            throw "error"
        }
        
        
    }catch(error){
        logger.error(error, "error in login")
        return res.json({
            success: "false",
            message: error
        })
    }
}

    const updatePassword = async function (req, res){
        try{
            let {
                email, password
             } = req.body;
             var hash = await bcrypt.hash(password, 10)
             let updatePassword = await userModel.updatePassword(hash, email);
                return res.json({
                    success:"true",
                    message: "Password Updated"
                })
            
        }catch(error){
            logger.error(error, "error in login")
            return res.json({
                success: "false",
                message: error
            })
        }
        
    }




const forgotPassword = async function (req, res){
    try{
     let {
        email, password
     } = req.body;
 
     let forgot = await userModel.forgotPassword(email);
     if(email == forgot.email){
        var hash = await bcrypt.hash(password, 10)
         let updatePassword = await userModel.updatePassword(hash, email);
     }
 
     return res.json({
         success:"true",
         message: "successfully password updated"
     })
    } catch(error){
         logger.error(error);
         return res.json({
             success: "false",
             message: error
         })
    }
 }

const logout = async function (req, res){
    try{
        if(req.session.isAuth){
            req.session.destroy();
           
        }
        console.log("hello")
       
        // let {
        //     refreshToken
        // } = req.body;
        // if(!refreshToken){
        //     throw "refresh token doesnot given"
        // }
        //const username = await verifyRefreshToken(refreshToken);
       
            return res.json({
                success:"true",
                message: "logged out"
     })
            
        
    }catch(error){
        logger.error(error, "error in logout")
        return res.json({
            success: "false",
            message: error
        })
    }
    
}

const refresh = async function (req, res){
    try{
        // let {
        //     refreshToken
        // } = req.body
        // if(!refreshToken){
        //     throw "error in rftok"
        // }
     //const username = await vrefreshToken(refreshToken);
        const username = req.username

     const accessToken = await signAccessToken(username);
     
     const refToken = await signRefreshToken(username);
            return res.json({
                accessToken: accessToken,
                refreshToken: refToken
        })
        
    }catch(error){
        logger.error(error, "error in refresh")
        return res.json({
            success: "false",
            message: error
        })
    }
    
}

const isAuth = async (req, res, next) => {
    if(req.session.isAuth){
        next();
    }else{
        res.send("cant access")
    }
}

module.exports = {login, logout, isAuth, register, forgotPassword, updatePassword, refresh};