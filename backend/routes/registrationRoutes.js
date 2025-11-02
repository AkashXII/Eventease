import express from "express";
import { registerForEvent, getEventAttendees, getMyRegistrations } from "../controllers/registrationController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, registerForEvent);
router.get("/event/:eventId", verifyToken, getEventAttendees);
router.get("/me", verifyToken, getMyRegistrations);

export default router;
