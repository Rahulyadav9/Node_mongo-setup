const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    CreatedAt:{type:Date, default:Date.now},
});

module.exports = new mongoose.model("User", userSchema)