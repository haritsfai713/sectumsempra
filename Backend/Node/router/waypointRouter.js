const express = require('express');

var router = express.Router();

var {
    WayPoint
} = require('../models/waypoint');

router.get('/', (req, res) => {
    WayPoint.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error while get all data in parameters collection ' + JSON.stringify(err, undefined, 2));
        }
    })
})

router.post('/', (req, res) => {
    var wp = new WayPoint({
        command: req.body.command,
        param1: req.body.param1,
        param2: req.body.param2,
        param3: req.body.param3,
        param4: req.body.param4,
        x: req.body.x,
        y: req.body.y,
        z: req.body.z,
        target_system: req.body.target_system,
        target_component: req.body.target_component,
        //'seq': seq, 
        frame: req.body.frame,
        mission_type: req.body.mission_type,
        current: req.body.current,
        autocontinue: req.body.autocontinue
    })
    wp.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log("Error in waypoint save" + JSON.stringify(err, undefined, 2));
        }
    })
})


module.exports = router;