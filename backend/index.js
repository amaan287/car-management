import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import carRoutes from "./routes/car.route.js";
import cookieParser from "cookie-parser";
import path from "path";
import { configDotenv } from "dotenv";
import cors from "cors";

configDotenv.apply();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const connectionString = process.env.CONNECTION_STRING;
const port = process.env.PORT;
const __dirname = path.resolve();
mongoose
  .connect(connectionString, {})
  .then(() => {
    console.log("Database Connected");
    app.listen(port, () => {
      console.log(`server is running on http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/car", carRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  res.status(statusCode).json({
    sucess: false,
    statusCode,
    message,
  });
});
