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

// Manually set CORS headers for all responses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://restaurant-website-onl9.vercel.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");

  // If it's a preflight request, respond with success
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// CORS configuration using cors package
const corsOptions = {
  origin: 'https://restaurant-website-onl9.vercel.app',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

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
