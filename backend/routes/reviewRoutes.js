import express from "express";
import { addReview, getEventReviews } from "../controllers/reviewController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, addReview);
router.get("/event/:eventId", getEventReviews);

export default router;
