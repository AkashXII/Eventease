import React, { useEffect, useState } from "react";
import api from "../api/axios";
import EventCard from "../components/EventCard";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const params = debouncedSearch ? { search: debouncedSearch } : {};

    api
      .get("/events", { params, signal: controller.signal })
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "CanceledError" || err.name === "AbortError") return;
        setError("Failed to load events");
        setLoading(false);
      });

    return () => controller.abort();
  }, [debouncedSearch]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-white text-center">
        Upcoming Events
      </h1>

      <div className="mb-8 flex justify-center" role="search">
        <input
          type="text"
          placeholder="Search events by title or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl px-4 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/40"
        />
      </div>

      {loading ? (
        <div className="flex justify-center mt-10">
          <span className="animate-spin h-6 w-6 border-2 border-white rounded-full border-t-transparent" />
        </div>
      ) : error ? (
        <p className="text-center mt-10 text-red-400">{error}</p>
      ) : events.length === 0 ? (
        <p className="text-center text-white">No events found :(</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {events.map((event) => (
            <EventCard key={event.event_id} event={event} />
          ))}
        </div>
      )}
    </>
  );
}