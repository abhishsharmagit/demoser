const logger = require('../utils/logger').getLogger("controller/login.js");

const isAuth = async (req, res, next) => {
    if(req.session.isAuth){
        next();
    }else{
        res.send("cant access")
    }
}

const login = async function (req, res){
    try{
        req.session.isAuth = true;
        res.send("user loggedin")
    }catch(err){
        logger.error(err, "error in login")
        res.send(err)
    }
    
}

const user = async function (req, res){
console.log(req.session)
res.send("fggj")
}

const logout = async function (req, res){
req.session.destroy();
res.send("user loggedout")
}

module.exports = {login, user, logout, isAuth};