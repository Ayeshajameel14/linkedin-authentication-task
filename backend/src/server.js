const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

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

    return res.status(500).json({
      message: "Database connection failed",
    });
  }
});

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Authentication backend is running",
  });
});

if (require.main === module) {
  const startServer = async () => {
    try {
      await connectDB();

      app.listen(process.env.PORT || 5000, () => {
        console.log("Server running on http://localhost:5000");
      });
    } catch (error) {
      console.error("Server startup failed:", error.message);
    }
  };

  startServer();
}

module.exports = app;