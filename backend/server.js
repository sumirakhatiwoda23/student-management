import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded profile pictures statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/auth", authRoutes);
app.use("/students", studentRoutes);

// Error Middleware
app.use(errorHandler);

// Connect DB & Start Server
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));