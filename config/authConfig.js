
var {isAuth} = require("../controller/user")
var {verifyAccessToken, verifyRefreshToken} = require("../utils/jwt")

// module.exports = {
//    session: isAuth,
//     token: verifyAccessToken
//   }



  var auth = (x) => {
    if(x){
      return verifyAccessToken;
    }else{
      return isAuth;
    }
  }

  var decide = (req, res, next) => {
    var session = false;
    if(session){
      req.sess = true;
      next();
    }else{
      next();
    }
  }

  module.exports = {auth, decide};

