var router = require('express').Router();
var userController = require("../controller/user")
var areaController = require("../controller/area")
var {verifyAccessToken, verifyRefreshToken} = require("../utils/jwt")
var {auth, decide} = require("../config/authConfig")


router.post("/squareArea", auth(true), areaController.squareArea);
router.post("/rectArea", auth(true), areaController.rectArea)
router.post("/circleArea", auth(true), areaController.circleArea)
router.post("/triArea", auth(true), areaController.triArea)
router.get("/getArea", auth(true), areaController.getArea)
router.get("/getsqArea", auth(true), areaController.getsqArea)
router.get("/getreArea", auth(true), areaController.getrectArea)
router.get("/getcirArea", auth(true), areaController.getcirArea)
router.get("/gettriArea",  areaController.gettriArea)
router.post("/login", decide, userController.login)
router.post("/logout", verifyRefreshToken, userController.logout)
router.post("/register",  userController.register)
router.post("/refresh", verifyRefreshToken, userController.refresh)
router.post("/forgot", auth(true), userController.forgotPassword)
router.post("/update", auth(true), userController.updatePassword)

module.exports = router;