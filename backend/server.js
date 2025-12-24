import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

import { expireEvents } from "./utils/expireEvents.js";

dotenv.config({ path: ".env" });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/reviews", reviewRoutes);


// Health check
app.get("/", (req, res) => {
  res.send("EventEase Backend Running");
});

// Run event expiry job every 1 hour
setInterval(expireEvents, 60 * 60 * 1000);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
