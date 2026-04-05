import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Import your Routes
import programRoutes from "./routes/programRoutes.js";
import planRoutes from './routes/planRoutes.js';
import trainerRoutes from './routes/trainerRoutes.js'; // 1. ADDED THIS
import scheduleRoutes from './routes/scheduleRoutes.js';
import authRoutes from './routes/authRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// 1. ✅ GLOBAL MIDDLEWARE
app.use(cors());

/** * 2. ✅ STRIPE WEBHOOK (FIXED PATH)
 * This MUST stay above express.json()
 */
app.use("/api/plans/webhook", express.raw({ type: "application/json" }));

// 3. ✅ STANDARD PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. ✅ STATIC ASSETS
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 5. ✅ ROUTES
app.get("/", (req, res) => {
  res.send("IronCore PowerHouse API is running 🚀");
});

app.use("/api/programs", programRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/trainers', trainerRoutes); // 2. ADDED THIS
app.use('/api/schedule', scheduleRoutes);
app.use('/api/auth', authRoutes);

// 6. ✅ GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// 7. ✅ DATABASE CONNECTION
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};
connectDB();

// 8. ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});