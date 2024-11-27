const mongoose = require("mongoose")

const productModel = new mongoose.Schema({
    product_name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
        trim: true,
        max:[500, "you can not have more than 500 characters"]
    },
    price:{
        type: Number,
        required: true,
    },
    stock:{
        type:Number,
        required: true,
    },
    category:{
        type: String,
        required: true,
        enum: ["cloth" , "shoe", "accessories", "gadget"],
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    updatedAt:{
        type: Date,
        default: Date.now,
    }
})


module.exports = mongoose.model("product", productModel )