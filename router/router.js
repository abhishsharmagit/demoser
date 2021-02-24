var router = require('express').Router();
var areaController = require("../controller/area")
var loginController = require("../controller/login")

router.post("/squareArea", loginController.isAuth, areaController.squareArea);
router.post("/rectArea", areaController.rectArea)
router.post("/circleArea", areaController.circleArea)
router.post("/triArea", areaController.triArea)
router.get("/getArea", areaController.getArea)
router.get("/getsqArea", areaController.getsqArea)
router.get("/getreArea", areaController.getrectArea)
router.get("/getcirArea", areaController.getcirArea)
router.get("/gettriArea", areaController.gettriArea)
router.get("/login", loginController.login)
router.get("/user", loginController.isAuth, loginController.user)
router.get("/logout",  loginController.logout)

module.exports = router;