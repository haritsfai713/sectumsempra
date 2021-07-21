const mongoose = require('mongoose');


var FlightData = mongoose.model('FlightData', {
    time_boot_ms: Number,
    pitch: Number,
    roll: Number,
    yaw: Number,
    rollspeed: Number,
    pitchspeed: Number,
    yawspeed: Number,
    airspeed: Number,
    groundspeed: Number,
    heading: Number,
    throtlle: Number,
    alt: Number,
    climb: Number,
})

module.exports = FlightData;