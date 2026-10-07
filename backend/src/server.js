const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Authentication backend is running",
  });
});

let isDatabaseConnected = false;

app.use(async (req, res, next) => {
  try {
    if (!isDatabaseConnected) {
      await connectDB();
      isDatabaseConnected = true;
    }

    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);
    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

module.exports = app;