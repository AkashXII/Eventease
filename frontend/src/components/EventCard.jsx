import React from "react";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded shadow hover:shadow-lg transition p-4">
      {event.image_url && (
        <img
          src={event.image_url}
          alt={event.title}
          className="h-40 w-full object-cover rounded mb-3"
        />
      )}

      <h3 className="text-lg font-semibold">{event.title}</h3>

      <p className="text-sm text-gray-600">
        {event.location} • {new Date(event.date).toLocaleString()}
      </p>

      {event.category && (
        <span className="inline-block mt-2 text-xs bg-gray-200 px-2 py-1 rounded">
          {event.category}
        </span>
      )}

      <p className="text-sm text-gray-700 mt-2 line-clamp-3">
        {event.description}
      </p>

      <Link
        to={`/event/${event.event_id}`}
        className="inline-block mt-3 text-blue-600 text-sm hover:underline"
      >
        View details →
      </Link>
    </div>
  );
}
