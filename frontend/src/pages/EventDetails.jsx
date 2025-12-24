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
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const isPastEvent = event && new Date(event.date) < new Date();

  useEffect(() => {
    const requests = [
      api.get(`/events/${id}`),
      api.get(`/registrations/count/${id}`),
      api.get(`/reviews/event/${id}`)
    ];

    if (user) {
      requests.push(api.get(`/registrations/status/${id}`));
    }

    Promise.all(requests)
      .then((responses) => {
        setEvent(responses[0].data);
        setRsvpCount(responses[1].data.count);
        setReviews(responses[2].data);

        if (user && responses[3]) {
          setRegistered(responses[3].data.registered);
        }

        setLoading(false);
      })
      .catch(() => {
        setMessage("Event not available");
        setLoading(false);
      });
  }, [id, user]);

  const handleRSVP = async () => {
    try {
      await api.post("/registrations", { event_id: id });
      setRegistered(true);
      setRsvpCount((prev) => prev + 1);
      setMessage("✅ You are registered for this event");
    } catch (err) {
      setMessage(err.response?.data?.msg || "Could not register");
    }
  };

  const submitReview = async () => {
    if (!reviewText.trim()) {
      setMessage("Review cannot be empty");
      return;
    }

    try {
      await api.post("/reviews", {
        event_id: id,
        rating,
        review_text: reviewText,
      });

      setReviewText("");
      setRating(5);
      setMessage("Review submitted");

      const res = await api.get(`/reviews/event/${id}`);
      setReviews(res.data);
    } catch (err) {
      setMessage(err.response?.data?.msg || "Could not submit review");
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

      <p className="mt-4 text-sm text-gray-700">
        👥 {rsvpCount} people registered
      </p>

      {/* RSVP SECTION */}
      <div className="mt-6">
        {!user && (
          <p className="text-sm text-gray-500">
            Please log in to register for this event.
          </p>
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

      {message && (
        <p className="mt-4 text-sm font-medium text-blue-600">{message}</p>
      )}

      {/* REVIEWS SECTION */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Reviews</h2>

        {user && registered && !isPastEvent && (
          <div className="mb-6">
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border p-1 rounded"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} ⭐
                </option>
              ))}
            </select>

            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review..."
              className="w-full border p-2 rounded mt-2"
            />

            <button
              onClick={submitReview}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit Review
            </button>
          </div>
        )}

        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <div key={r.review_id} className="border-b py-3">
              <p className="font-medium">
                {r.name} • {r.rating} ⭐
              </p>
              <p className="text-sm text-gray-700">{r.review_text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
