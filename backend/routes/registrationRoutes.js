import express from "express";
import {
  registerForEvent,
  getEventAttendees,
  getMyRegistrations,
  getRegistrationStatus,
  getRSVPCount
} from "../controllers/registrationController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, registerForEvent);
router.get("/me", verifyToken, getMyRegistrations);
router.get("/event/:eventId", verifyToken, getEventAttendees);

// NEW
router.get("/status/:eventId", verifyToken, getRegistrationStatus);
router.get("/count/:eventId", getRSVPCount);

export default router;
