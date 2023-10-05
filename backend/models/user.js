// import mongoose
const mongoose = require("mongoose");
// import mongoose-unique-validator
var uniqueValidator = require('mongoose-unique-validator');
// user Schema
const userSchema = mongoose.Schema({
    firstName: String, 
    lastName:  String, 
    email: { type: String, unique: true},
    pwd:  String,
    role:String, 
    avatar:String, //file path 
});
userSchema.plugin(uniqueValidator);
// affect userSchema to user model
const user = mongoose.model("User", userSchema);
// exports user
module.exports = user;