const User = require("../models/userModel");


exports.getAllUser = async(req, res, next) => {
    const user = await User.find();

    res.status(200).json({
        status: "success",
        data: user,
    });
};

exports.getUser = async(req, res, next) => {
    res.status(200).json({
        status: "not implemented"
    });
};