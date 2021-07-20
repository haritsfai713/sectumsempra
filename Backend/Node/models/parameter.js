const mongoose = require('mongoose');


var Parameter = mongoose.model('Parameter', {
    param_value: Number,
    param_count: Number,
    param_index: Number,
    param_id: String,
    param_type: Number
})

module.exports = {
    Parameter
};