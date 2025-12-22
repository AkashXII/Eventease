import db from "../config/db.js";

/**
 * Register current user for an event (RSVP)
 */
export const registerForEvent = (req, res) => {
  const { event_id } = req.body;
  const user_id = req.user.id;

  if (!event_id) {
    return res.status(400).json({ msg: "Event ID is required" });
  }

  // Prevent duplicate registration
  const checkQuery = `
    SELECT 1 FROM registrations
    WHERE user_id = ? AND event_id = ?
    LIMIT 1
  `;

  db.query(checkQuery, [user_id, event_id], (err, result) => {
    if (err) return res.status(500).json({ msg: err });

    if (result.length > 0) {
      return res.status(400).json({ msg: "Already registered!" });
    }

    const insertQuery = `
      INSERT INTO registrations (event_id, user_id)
      VALUES (?, ?)
    `;

    db.query(insertQuery, [event_id, user_id], (err) => {
      if (err) return res.status(500).json({ msg: err });
      res.json({ msg: "Registration successful" });
    });
  });
};

/**
 * Check if current user is registered for an event (UX helper)
 */
export const getRegistrationStatus = (req, res) => {
  const user_id = req.user.id;
  const { eventId } = req.params;

  const query = `
    SELECT 1 FROM registrations
    WHERE user_id = ? AND event_id = ?
    LIMIT 1
  `;

  db.query(query, [user_id, eventId], (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    res.json({ registered: result.length > 0 });
  });
};

/**
 * Get total RSVP count for an event (UX helper)
 */
export const getRSVPCount = (req, res) => {
  const { eventId } = req.params;

  const query = `
    SELECT COUNT(*) AS count
    FROM registrations
    WHERE event_id = ?
  `;

  db.query(query, [eventId], (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    res.json({ count: result[0].count });
  });
};

/**
 * Get all attendees of an event (admin / organizer view)
 */
export const getEventAttendees = (req, res) => {
  const { eventId } = req.params;

  const query = `
    SELECT 
      users.user_id,
      users.name,
      users.email,
      registrations.registered_at
    FROM registrations
    JOIN users ON registrations.user_id = users.user_id
    WHERE registrations.event_id = ?
    ORDER BY registrations.registered_at ASC
  `;

  db.query(query, [eventId], (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    res.json(result);
  });
};

/**
 * Get events the current user has registered for
 */
export const getMyRegistrations = (req, res) => {
  const user_id = req.user.id;

  const query = `
    SELECT events.*
    FROM registrations
    JOIN events ON registrations.event_id = events.event_id
    WHERE registrations.user_id = ?
    ORDER BY events.date ASC
  `;

  db.query(query, [user_id], (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    res.json(result);
  });
};
