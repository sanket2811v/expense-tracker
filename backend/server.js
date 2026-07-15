const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const expenseRoutes = require("./routes/expenseRoutes");
const Expense = require("./models/Expense");

const envPath = path.join(__dirname, ".env");
const dotenvResult = dotenv.config({ path: envPath });

if (dotenvResult.error) {
  console.warn(`Warning: could not load .env at ${envPath}:`, dotenvResult.error.message);
} else {
  console.log(`Loaded environment from: ${envPath}`);
}

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is missing");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173,http://localhost:5174")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const isLocalDevOrigin = (origin) =>
  /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin || "");

console.log("CORS allowed origins:", allowedOrigins.join(", "));

app.use(
  cors({
    origin(origin, callback) {
      // Non-browser tools (Postman/curl) send no Origin
      if (!origin) {
        return callback(null, true);
      }

      // Exact matches from CLIENT_URL
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Local Vite may use 5173, 5174, 5175, ... when a port is busy
      if (isLocalDevOrigin(origin)) {
        return callback(null, true);
      }

      // Do not throw — throwing becomes an unhandled Express error
      console.warn(`CORS blocked origin: ${origin}`);
      return callback(null, false);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Expense Tracker API is running",
  });
});

app.get("/api/health", async (req, res) => {
  try {
    const documentCount = await Expense.countDocuments();
    const collections = await mongoose.connection.db.listCollections().toArray();

    return res.status(200).json({
      success: true,
      server: { port: PORT },
      mongodb: {
        uri: process.env.MONGODB_URI,
        host: mongoose.connection.host,
        port: mongoose.connection.port,
        database: mongoose.connection.name,
        readyState: mongoose.connection.readyState,
        collection: Expense.collection.name,
        collections: collections.map((c) => c.name),
        documentCount,
      },
      compass: {
        connectWith: "mongodb://127.0.0.1:27017",
        thenOpen: "expense-tracker > expenses > Documents",
        tip: "Click the Refresh button in Compass after adding an expense",
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.use("/api/expenses", expenseRoutes);


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});


app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  const status = err.message?.startsWith("CORS") ? 403 : 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
};

startServer();
