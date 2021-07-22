const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Masukkan email anda!"],
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    passwordConfirm: {
        type: String,
        required: true,
        validate: {
            validator: function(val) {
                return this.password === val
            },
            message: "Password berbeda!",
        },
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;