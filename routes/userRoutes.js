const router = require("express").Router();
const userController = require("../controllers/userController.js");

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/recoverPassword", userController.recoverPassword);

module.exports = router;
