const express = require("express");
const userController = require("../controller/userController.js");
const router = express.Router();

//USER API ROUTES
router.get("/", userController.getAllUser);

module.exports = router;
