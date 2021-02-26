var router = require('express').Router();
var areaController = require("../controller/area")
var userController = require("../controller/user")

router.post("/squareArea", userController.isAuth, areaController.squareArea);
router.post("/rectArea", userController.isAuth, areaController.rectArea)
router.post("/circleArea", userController.isAuth, areaController.circleArea)
router.post("/triArea", userController.isAuth, areaController.triArea)
router.get("/getArea", userController.isAuth, areaController.getArea)
router.get("/getsqArea", userController.isAuth, areaController.getsqArea)
router.get("/getreArea", userController.isAuth, areaController.getrectArea)
router.get("/getcirArea", userController.isAuth, areaController.getcirArea)
router.get("/gettriArea", userController.isAuth, areaController.gettriArea)
router.post("/login", userController.login)
router.get("/logout", userController.isAuth, userController.logout)
router.post("/register",  userController.register)
router.post("/forgot",  userController.forgotPassword)

module.exports = router;