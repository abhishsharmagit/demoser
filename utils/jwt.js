const jwt = require("jsonwebtoken");
const redisClient = require("../db/redis")

var signAccessToken = (username) => {
    return new Promise((resolve, reject) => {
        const options = {
            expiresIn : "1d"
        }

        jwt.sign({username}, process.env.SECRET, options, (err, token) => {
            if(err)reject(err);
            resolve(token);
        })
    })
}

var verifyAccessToken = (req, res, next) =>{
    
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.json({message: "Access Denied"})
    }
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1]

    jwt.verify(token, process.env.SECRET, (err, payload)=>{
        if(err){
            throw err.message;
            
        }
        req.payload = payload;
        next();
    })
}

var signRefreshToken = (username) => {
    return new Promise((resolve, reject) => {
        const options = {
            expiresIn : "1y"
        }
        jwt.sign({username}, process.env.NEWSECRET, options, (err, token) => {
            if(err)reject(err);
            
            redisClient.SET(username, token, (err, reply)=>{
                if(err){
                    reject(err);
                    return
                }
                resolve(token);
            })
            
        })
    })
}

    var verifyRefreshToken = (req, res, next) =>{
        if(!req.session.isAuth){
            return new Promise((resolve, reject)=>{
    
                const authHeader = req.headers['authorization'];
            if(!authHeader){
                return res.json({message: "Access Denied"})
            }
            const bearerToken = authHeader.split(" ");
            const token = bearerToken[1]
        
                jwt.verify(token, process.env.NEWSECRET, (err, payload)=>{
                    if(err){
                        throw "error in verify";
                    }
                 
                    req.username = payload.username;
                    if(req.url === "/logout"){
                        const username = req.username;
                        redisClient.GET(username, (err, result)=>{
                         if(err){
                            reject(err)
                            return
                        }
                        if(token === result){
                            redisClient.DEL(username, (err, val)=>{
        
                                if(err){
                                    throw 'error in deleting';
                                }
                                resolve();
                         })
        
                        }
                        reject(err);
                    })}
                    resolve(req.username);
                    next();
                })
                
            })
        }else{
            next()
        }
        
       
    }




module.exports = {signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken}