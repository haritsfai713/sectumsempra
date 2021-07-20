const express = require('express');

var router = express.Router();

var {
    Parameter
} = require('../models/parameter');

router.get('/', (req, res) => {
    Parameter.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error while get all data in parameters collection ' + JSON.stringify(err, undefined, 2));
        }
    })
})

router.post('/', (req, res) => {
    var param = new Parameter({
        param_value: req.body.param_value,
        param_count: req.body.param_count,
        param_index: req.body.param_index,
        param_id: req.body.param_id,
        param_type: req.body.param_type
    })
    param.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log("Error in save post parameter" + JSON.stringify(err, undefined, 2));
        }
    })
})

module.exports = router;