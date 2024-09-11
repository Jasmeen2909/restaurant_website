const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const orderRoute = require("./routes/order");
const menuitemRoute = require("./routes/menuitem");
const reservationRoute = require("./routes/reservation");
const cors = require("cors");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/order", orderRoute);
app.use("/api/menuitem", menuitemRoute);
app.use("/api/reservation", reservationRoute);

// Port configuration
const port = process.env.PORT || 8800;

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}!`);
});
