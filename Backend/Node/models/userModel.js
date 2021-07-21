const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nama: String,
  email: String,
  password: String,
  passwordConfirm: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
