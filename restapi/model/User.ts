const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    surname: String,
    email: String,
    age: Number
});

module.exports = mongoose.model("UserSchema", userSchema);
