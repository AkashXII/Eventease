import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import db from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("EventEase Backend Running ");
});

app.listen(5000, () => console.log("Server running on port 5000"));
