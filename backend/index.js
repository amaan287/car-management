import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import carRoutes from "./routes/car.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import { fileURLToPath } from 'url';

// Configure dotenv properly
dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const connectDB = async () => {
  try {
    const connectionString = process.env.CONNECTION_STRING;
    if (!connectionString) {
      throw new Error('MongoDB connection string is not defined in environment variables');
    }

    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    console.log('Database Connected Successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);

    setTimeout(connectDB, 5000);
  }
};

const startServer = async () => {
  const port = process.env.PORT || 8765;

  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

// API routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/car", carRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Handle client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(err); // Log error for debugging

  res.status(statusCode).json({
    success: false, // Fixed typo in 'success'
    statusCode,
    message,
  });
});

// Start the server
startServer();