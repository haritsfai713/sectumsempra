const express = require("express");
const userController = require("../controller/userController.js");
const authController = require("../controller/authController.js");
const router = express.Router();

//AUTH ROUTES
router.post("/signup", authController.signup)
router.post("/login", authController.login)
router.get("/verifyToken", authController.tokenValidation)

//PROTECTING ROUTES
router.use(authController.verifyToken)

//USER API ROUTES
router.get("/", userController.getAllUser);
router.get("/:id", userController.getUser);

module.exports = router;