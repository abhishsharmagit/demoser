const logger = require('../utils/logger').getLogger("controller/user.js");
const userModel = require("../model/user")
var bcrypt = require('bcryptjs');


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
            if(validPass){
                req.session.isAuth = true;
                return res.json({
                    success:"true",
                    message: "Successfully Logged in"
                })
            }else{
                throw "wrong Inputs"
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
         req.session.destroy();

            return res.json({
                success:"true",
                message: "logged out"
        })
        
    }catch(error){
        logger.error(error, "error in login")
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

module.exports = {login, logout, isAuth, register, forgotPassword, updatePassword};