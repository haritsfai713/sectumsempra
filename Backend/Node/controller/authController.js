const User = require("../models/userModel")
exports.signup = async(req, res, next) => {
    const {
        nama,
        email,
        password,
        passwordConfirm
    } = req.body;

    const user = await User.create({
        nama,
        email,
        password,
        passwordConfirm
    })

    res.status(201).json({
        status: "success",
        data: user
    })
    console.log(req.body)
}

exports.login = (req, res, next) => {
    console.log(req.body)
}