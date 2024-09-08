const express = require("express")
const app=express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authRoute = require("./routes/auth")
const orderRoute = require("./routes/order")
const menuitemRoute = require("./routes/menuitem")
const reservationRoute = require("./routes/reservation")
const cors=require('cors');

dotenv.config();
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("DB Connection Successfull")
})
.catch((err)=>{
    console.error("error connecting to mongoDB ",err)
})

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute)
app.use("/api/order", orderRoute)
app.use("/api/menuitem", menuitemRoute)
app.use("/api/reservation", reservationRoute)



app.listen(8800,()=>{
    console.log("Backend server is running!");
});