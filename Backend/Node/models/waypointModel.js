const mongoose = require("mongoose");

const WayPointSchema = new mongoose.Schema({
  command: Number,
  param1: Number,
  param2: Number,
  param3: Number,
  param4: Number,
  x: Number,
  y: Number,
  z: Number,
  target_system: Number,
  target_component: Number,
  //'seq': seq,
  frame: Number,
  mission_type: Number,
  current: Number,
  autocontinue: Number,
});

var WayPoint = mongoose.model("WayPoint", WayPointSchema);

module.exports = WayPoint;
