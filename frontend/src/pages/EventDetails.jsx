import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function EventDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [rsvpCount, setRsvpCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const isPastEvent = event && new Date(event.date) < new Date();

  useEffect(() => {
    Promise.all([
      api.get(`/events/${id}`),
      api.get(`/registrations/count/${id}`),
      user ? api.get(`/registrations/status/${id}`) : null
    ])
      .then(([eventRes, countRes, statusRes]) => {
        setEvent(eventRes.data);
        setRsvpCount(countRes.data.count);
        if (statusRes) setRegistered(statusRes.data.registered);
        setLoading(false);
      })
      .catch(() => {
        setMessage("Event not found");
        setLoading(false);
      });
  }, [id, user]);

  const handleRSVP = async () => {
    try {
      await api.post("/registrations", { event_id: id });
      setRegistered(true);
      setRsvpCount((c) => c + 1);
      setMessage("✅ You are registered for this event");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Could not register");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading event...</p>;
  if (!event) return <p className="text-center mt-10 text-red-500">{message}</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      {event.image_url && (
        <img
          src={event.image_url}
          alt={event.title}
          className="w-full max-h-96 object-cover rounded mb-4"
        />
      )}

      <h1 className="text-2xl font-bold">{event.title}</h1>

      <p className="text-sm text-gray-600 mt-1">
        {event.location} • {new Date(event.date).toLocaleString()}
      </p>

      {event.category && (
        <span className="inline-block mt-2 text-xs bg-gray-200 px-2 py-1 rounded">
          {event.category}
        </span>
      )}

      <p className="mt-4">{event.description}</p>

      <p className="mt-4 text-sm text-gray-700">
        👥 {rsvpCount} people registered
      </p>

      <div className="mt-6">
        {!user && (
          <p className="text-sm text-gray-500">Please log in to register.</p>
        )}

        {user && isPastEvent && (
          <p className="text-red-500 font-medium">Event has ended</p>
        )}

        {user && !isPastEvent && registered && (
          <p className="text-green-600 font-medium">
            ✅ You are registered for this event
          </p>
        )}

        {user && !isPastEvent && !registered && (
          <button
            onClick={handleRSVP}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            RSVP
          </button>
        )}
      </div>

      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}
