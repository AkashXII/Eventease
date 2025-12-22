import React, { useEffect, useState } from "react";
import api from "../api/axios";
import EventCard from "../components/EventCard";

export default function MyRegistrations() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/registrations/me")
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load your registered events");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading your events...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">My Registered Events</h1>

      {events.length === 0 ? (
        <p>You haven’t registered for any events yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.event_id} event={event} />
          ))}
        </div>
      )}
    </>
  );
}
