const logger = require('../utils/logger').getLogger("controller/user.js");
const userModel = require("../model/user")


const register = async function (req, res){
    try{
     let {
         username, email, password
     } = req.body;
 
     let registeration = await userModel.registerUser(username, email, password);
 
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
        console.log(login)
        if(password == login.password){
            req.session.isAuth = true;
            return res.json({
                success:"true",
                message: login
            })
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

const forgotPassword = async function (req, res){
    try{
     let {
        email, password
     } = req.body;
 
     let forgot = await userModel.forgotPassword(email);
     if(email == forgot.email){
         let updatePassword = await userModel.updatePassword(password, email);
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

module.exports = {login, logout, isAuth, register, forgotPassword};