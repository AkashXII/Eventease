import express from "express";
import { createEvent, getEvents, getEvent, deleteEvent, updateEvent } from "../controllers/eventController.js";
import { verifyToken, adminOnly } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/", verifyToken, adminOnly, upload.single("image"), createEvent);
router.get("/", getEvents);
router.get("/:id", getEvent);
router.put("/:id", verifyToken, adminOnly, upload.single("image"), updateEvent);
router.delete("/:id", verifyToken, adminOnly, deleteEvent);

export default router;
