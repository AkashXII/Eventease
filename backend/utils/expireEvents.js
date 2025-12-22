import db from "../config/db.js";

export const expireEvents = () => {
  const query = `
    UPDATE events
    SET status = 'expired'
    WHERE status != 'expired'
      AND date < NOW() - INTERVAL 36 HOUR
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Event expiration failed:", err);
    } else if (result.affectedRows > 0) {
      console.log(`Expired ${result.affectedRows} events`);
    }
  });
};
