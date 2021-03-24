var redis = require("redis")


let redisClient = redis.createClient({
    port: 6379,
    host: "localhost"
})

redisClient.on('connect', ()=>{
    console.log("connected to redis")
})

redisClient.on('ready', ()=>{
    console.log("connected to redis and ready to use")
})

redisClient.on('error', (err)=>{
    console.log(err)
})





module.exports = redisClient