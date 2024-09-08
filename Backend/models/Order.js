const mongoose = require("mongoose")

const orderSchema= new mongoose.Schema({
    items:[{
        itemid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"MenuItem",
            required:true
        },
        quantity:{
            type:Number,
            required:true,
            min:1
        }
        
    }],
    totalPrice:Number,
    customerDetails:{
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        name:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
            
        },
        phone:{
            type:Number,
            required:true
        }

    },
    orderDate:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model("Order",orderSchema)