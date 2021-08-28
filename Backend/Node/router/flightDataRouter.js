const express = require("express");

const flightdataController = require("../controller/flightdataController");
const router = express.Router();

router.post("/", flightdataController.sendFlightData);
router.get("/", (req, res, next) => {
  res.send("hellow");
});

// flight data without Database because its too long to use database

// var {
//     FlightData
// } = require('./../models/flightdata');

// router.get('/', (req, res) => {
//     F
// })

module.exports = router;
