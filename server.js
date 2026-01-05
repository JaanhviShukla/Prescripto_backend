import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "../config/mongodb.js";
import connectCloudinary from "../config/cloudinary.js";
import adminRouter from "../routes/adminRoute.js";
import doctorRouter from "../routes/doctorRoute.js";
import userRouter from "../routes/userRoute.js";

const app = express();

/* ✅ DB & Cloudinary */
connectDB();
connectCloudinary();

/* ✅ CORS MUST COME FIRST */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://presrcipto-frontend.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());

/* ✅ Body parser */
app.use(express.json());

/* ✅ Disable caching (fix 304 + CORS issues) */
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

/* ✅ Routes */
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

/* ✅ Test route */
app.get("/", (req, res) => {
  res.send("Backend working on Vercel 🚀");
});

/* ❌ REMOVE app.listen() */
/* ✅ EXPORT APP INSTEAD */
export default app;
