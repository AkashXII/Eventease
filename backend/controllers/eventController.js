import db from "../config/db.js";
import cloudinary from "../config/cloudinary.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, location, date, category } = req.body;

    if (!title || !description || !location || !date)
      return res.status(400).json({ msg: "All fields required" });

    // Upload image if present
    let image_url = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "eventease/events"
      });
      image_url = result.secure_url;
    }

    const query = `
      INSERT INTO events (title, description, location, date, created_by, image_url,category)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [title, description, location, date, req.user.id, image_url,category],
      (err, result) => {
        if (err) return res.status(500).json({ msg: err });

        res.json({ msg: "Event created successfully!" });
      }
    );
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getEvents = (req, res) => {
  const search = req.query.search || "";

  const query = `
    SELECT *
    FROM events
    WHERE date >= NOW()
    AND (title LIKE ? OR location LIKE ?)
    ORDER BY date ASC
  `;

  const searchValue = `%${search}%`;

  db.query(query, [searchValue, searchValue], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Database error" });
    }

    res.json(result);
  });
};
export const getEvent = (req, res) => {
  db.query(
    "SELECT * FROM events WHERE event_id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ msg: err });
      if (result.length === 0)
        return res.status(404).json({ msg: "Event not found" });
      res.json(result[0]);
    }
  );
};


export const deleteEvent = (req, res) => {
  db.query("DELETE FROM events WHERE event_id = ?", [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ msg: err });
      res.json({ msg: "Event deleted" });
    }
  );
};

export const updateEvent = async (req, res) => {
  const { title, description, location, date } = req.body;
  let image_url = req.body.image_url || null;

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "eventease/events"
    });
    image_url = result.secure_url;
  }

  const query = `
    UPDATE events SET title=?, description=?, location=?, date=?, image_url=?
    WHERE event_id=?
  `;
  db.query(query, [title, description, location, date, image_url, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ msg: err });
      res.json({ msg: "Event updated" });
    }
  );
};
