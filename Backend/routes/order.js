const router = require("express").Router();
const User = require("../models/Users");
const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");

router.post("/placeOrder",async(req,res)=>{
    const{userId,name,address,phone,items}=req.body;

    try{
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        let totalPrice=0;
        for(const item of items){
            const menuItem = await MenuItem.findById(item.itemid);
            if (!menuItem){
                return res.status(404).json({ message:`Menu item not found:"${item.itemid}"`});
            }
            totalPrice+=menuItem.price*item.quantity
                
        }
        const newOrder= new Order({
            items,
            totalPrice,
            customerDetails:{
                userId,
                name,
                address,
                phone

            }
        });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    }
    catch(err){
        res.status(500).json({ error: err.message });
        console.log(err);
    }


});

router.get("/", async (req, res) => {
    try {
        const orders = await Order.find({'customerDetails.userId':req.body.userId});
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports=router;





