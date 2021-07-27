const User = require("../models/userModel");
const createError = require("http-errors");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.verifyToken = (req, res, next) => {
    let token;
    // 1). Cek Keberadaan Token di Header
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1]
    } else {
        return next(createError(401, "Login kembali untuk akses!"))
    }

    // 2). Verifikasi JWT
    let tokenPayload = jwt.verify(token, process.env.JWT_SECRET_STRING)
    if (!tokenPayload) {
        return next(createError(401, "Login kembali untuk akses!"))
    }

    // 3). Menambahkan data user ke objek req
    req.userId = tokenPayload.subject

    next()
}

exports.tokenValidation = (req, res, next) => {
    let token;
    // 1). Cek Keberadaan Token di Header
    if (req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1]
    } else {
        return next(createError(401, "Login kembali untuk akses!"))
    }

    // 2). Verifikasi JWT
    let tokenPayload = jwt.verify(token, process.env.JWT_SECRET_STRING)
    if (!tokenPayload) {
        return next(createError(401, "Login kembali untuk akses!"))
    }

    // 3). Menambahkan data user ke objek req
    req.userId = tokenPayload.subject

    res.status(201).json({
        status : "success",
    })
}





exports.signup = async(req, res, next) => {
    const {
        nama,
        email,
        password,
        passwordConfirm
    } = req.body;

    // 1). CREATE USER DAN  SIMPAN KE DATABASE
    const user = await User.create({
        nama,
        email,
        password,
        passwordConfirm,
    });

    // 2). SIGN TOKEN JWT
    const jwtOption = {
        expiresIn: "7d",
    };
    const token = jwt.sign({
            id: user._id,
        },
        process.env.JWT_SECRET_STRING,
        jwtOption
    );

    res.status(201).json({
        status: "success",
        token,
        data: user,
    });
};

exports.login = async(req, res, next) => {
    const {
        email,
        password,
    } = req.body;
    const user = await User.find({
        email
    });
    if (user === undefined) {
        next(createError(401, "email anda salah"))
    }
    const match = await bcrypt.compare(password, user[0]["password"]);
    if (!match) {
        next(createError(401, "Password anda salah"))
    }
    // 2). SIGN TOKEN JWT
    const jwtOption = {
        expiresIn: "7d",
    };
    const token = jwt.sign({
            id: user._id,
        },
        process.env.JWT_SECRET_STRING,
        jwtOption
    );
    res.status(201).json({
        status: "success",
        data: user,
        token,

    })
};
