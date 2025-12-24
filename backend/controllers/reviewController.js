import db from "../config/db.js";

/**
 * ADD REVIEW
 * - User must have RSVP'd
 * - Event must have ended (time-based, not status-based)
 */
export const addReview = (req, res) => {
  const userId = req.user.id;
  const { event_id, rating, review_text } = req.body;

  if (!event_id || !rating || !review_text) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  // 1️⃣ Ensure event has ended (MySQL time comparison)
  const eventCheckQuery = `
    SELECT event_id
    FROM events
    WHERE event_id = ?
      AND date <= NOW()
    LIMIT 1
  `;

  db.query(eventCheckQuery, [event_id], (err, eventResult) => {
    if (err) return res.status(500).json({ msg: err });

    if (eventResult.length === 0) {
      return res.status(403).json({
        msg: "You can submit a review only after the event has ended",
      });
    }

    // 2️⃣ Ensure user RSVP'd
    const rsvpCheck = `
      SELECT 1 FROM registrations
      WHERE user_id = ? AND event_id = ?
      LIMIT 1
    `;

    db.query(rsvpCheck, [userId, event_id], (err, rsvpResult) => {
      if (err) return res.status(500).json({ msg: err });

      if (rsvpResult.length === 0) {
        return res.status(403).json({
          msg: "You must RSVP for the event before leaving a review",
        });
      }

      // 3️⃣ Insert review
      const insertReview = `
        INSERT INTO event_reviews (event_id, user_id, rating, review_text)
        VALUES (?, ?, ?, ?)
      `;

      db.query(
        insertReview,
        [event_id, userId, rating, review_text],
        (err) => {
          if (err) {
            if (err.code === "ER_DUP_ENTRY") {
              return res.status(400).json({
                msg: "You have already reviewed this event",
              });
            }
            return res.status(500).json({ msg: err });
          }

          res.json({ msg: "Review submitted successfully" });
        }
      );
    });
  });
};

/**
 * GET REVIEWS FOR AN EVENT
 */
export const getEventReviews = (req, res) => {
  const { eventId } = req.params;

  const query = `
    SELECT r.review_id, r.rating, r.review_text, r.created_at, u.name
    FROM event_reviews r
    JOIN users u ON r.user_id = u.user_id
    WHERE r.event_id = ?
    ORDER BY r.created_at DESC
  `;

  db.query(query, [eventId], (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    res.json(result);
  });
};
