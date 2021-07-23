const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
        minLength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: true,
        validate: {
            validator: function(val) {
                return this.password === val;
            },
            message: "Password berbeda!",
        },
        select: false,
    },
});

// HASHING PASSWORD
userSchema.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password, 10);
    this.passwordConfirm = undefined;
    next();
});

// HIDE PASSWORD
userSchema.post("save", function() {
    this.password = undefined;
});

const User = mongoose.model("User", userSchema);

module.exports = User;