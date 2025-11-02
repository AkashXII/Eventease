import db from "../config/db.js";

export const registerForEvent = (req, res) => {
  const { event_id } = req.body;
  const user_id = req.user.id;

  // Prevent duplicate registration
  const checkQuery = `SELECT * FROM registrations WHERE user_id=? AND event_id=?`;
  db.query(checkQuery, [user_id, event_id], (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    if (result.length > 0)
      return res.status(400).json({ msg: "Already registered!" });

    const query = `INSERT INTO registrations (event_id, user_id) VALUES (?, ?)`;
    db.query(query, [event_id, user_id], (err, result) => {
      if (err) return res.status(500).json({ msg: err });
      res.json({ msg: "Registration successful" });
    });
  });
};

export const getEventAttendees = (req, res) => {
  const { eventId } = req.params;

  const query = `
    SELECT users.user_id, users.name, users.email, registrations.registered_at
    FROM registrations
    JOIN users ON registrations.user_id = users.user_id
    WHERE registrations.event_id = ?;
  `;

  db.query(query, [eventId], (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    res.json(result);
  });
};

export const getMyRegistrations = (req, res) => {
  const user_id = req.user.id;

  const query = `
    SELECT events.*
    FROM registrations
    JOIN events ON registrations.event_id = events.event_id
    WHERE registrations.user_id = ?
    ORDER BY events.date ASC;
  `;

  db.query(query, [user_id], (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    res.json(result);
  });
};
