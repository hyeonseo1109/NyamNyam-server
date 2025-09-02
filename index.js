import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.js";
import placesRouter from "./routes/api/places.js";
dotenv.config();
console.log("✅ JWT_SECRET Loaded:", process.env.JWT_SECRET);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = "127.0.0.1";

// CORS 모든 도메인 허용
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// 라우터
app.use("/auth", authRouter);
app.use("/api/places", placesRouter);

app.listen(3000, HOST, () => {
  console.log(`server running on port ${PORT}`);
});