const express = require("express");
const userController = require("../controller/userController.js");
const authController = require("../controller/authController.js");
const router = express.Router();

//AUTH ROUTES
router.post("/signup", authController.signup)
router.post("/login", authController.login)

//PROTECTING ROUTES
router.use(authController.verifyToken)

//USER API ROUTES
router.get("/", userController.getAllUser);

module.exports = router;