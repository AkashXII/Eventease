import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function EventDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get(`/events/${id}`)
      .then((res) => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch(() => {
        setMessage("Event not found");
        setLoading(false);
      });
  }, [id]);

  const handleRSVP = async () => {
    try {
      await api.post("/registrations", { event_id: id });
      setMessage("✅ You have successfully registered for this event.");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Could not register");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading event...</p>;
  }

  if (!event) {
    return <p className="text-center mt-10 text-red-500">{message}</p>;
  }

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

      <p className="mt-4 text-gray-800">{event.description}</p>

      <div className="mt-6">
        {user ? (
          <button
            onClick={handleRSVP}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            RSVP
          </button>
        ) : (
          <p className="text-sm text-gray-500">
            Please log in to register for this event.
          </p>
        )}
      </div>

      {message && (
        <p className="mt-4 text-sm font-medium text-blue-600">{message}</p>
      )}
    </div>
  );
}
