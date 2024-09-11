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

const mongoURL = process.env.MONGO_URL;

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Time to wait for server selection before timing out
};

// Connect to MongoDB
mongoose.connect(mongoURL, options)
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    console.error("Stack Trace:", err.stack);
    process.exit(1); // Exit the process with a failure code
  });

// CORS configuration
const corsOptions = {
  origin: 'https://restaurant-website-onl9.vercel.app', // Frontend URL
  credentials: true, // Enable cookies
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

// Handle preflight requests (OPTIONS method) for all routes
app.options('*', cors(corsOptions));

// Middlewares
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
