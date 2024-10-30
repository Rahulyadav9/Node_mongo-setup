const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    productName:{type:String, required:true},
    quantity:{type:String, required:true, unique:true},
    price:{type:String, required:true},
    user:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"User"},
    orderDate:{type:Date, default:Date.now},
});

module.exports = new mongoose.model("Order", orderSchema);