import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/events/${eventId}`
        );
        console.log("Event Details Response:", response.data); // Log the entire response

        setEvent(response.data.event); // Accessing event object inside response
      } catch (err) {
        setError("Event not found or an error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <p className="text-center text-white mt-10">Loading event details...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  const placeholderImages = [
    "https://i.pinimg.com/736x/8a/d6/e9/8ad6e94478f3ebcbf731120649caf438.jpg",
    "https://i.pinimg.com/474x/83/00/28/8300288db359ebb374a1a540b2a59e43.jpg",
    "https://i.pinimg.com/736x/b6/a6/f0/b6a6f0a026658fb980c59e222d227b3c.jpg",
    "https://i.pinimg.com/474x/e3/32/17/e332171e9246ca5e0c38cc424a392310.jpg",
    "https://i.pinimg.com/736x/4e/f3/87/4ef387171d07be5516198c780b84e124.jpg",
  ];

  return (
    <section className="bg-[#0A0618] text-white py-12 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto bg-[#1C1C2E] p-6 rounded-lg shadow-lg">
        {/* Event Image */}
        <img
          src={
            event.image_url ||
            placeholderImages[
              Math.floor(Math.random() * placeholderImages.length)
            ]
          }
          alt={event.title}
          className="w-full h-60 object-cover rounded-md"
        />

        {/* Event Title */}
        <h2 className="text-3xl font-bold text-[#c09cdf] mt-4">
          {event.title}
        </h2>

        {/* Event Description */}
        <p className="text-gray-400 text-lg mt-2">{event.description}</p>

        {/* Event Details */}
        <p className="text-gray-400 mt-2">
          <strong>Date:</strong>{" "}
          {new Date(event.event_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="text-gray-400 mt-2">
          <strong>Time:</strong> {event.event_time}
        </p>
        <p className="text-gray-400 mt-2">
          <strong>Venue:</strong> {event.venue}
        </p>
        <p className="text-gray-400 mt-2">
          <strong>Category:</strong> {event.category}
        </p>
        <p className="text-gray-400 mt-2">
          <strong>Participants Limit:</strong> {event.participants_limit}
        </p>

        {/* Book Now Button */}
        <a
          href={"/loginguest"}
          className="mt-4 inline-block bg-[#ceb8db] hover:bg-[#815c9c] text-[#1C1C2E] px-6 py-3 rounded-md text-lg font-medium transition"
        >
          Book Now
        </a>

        {/* Back to Events Link */}
        <div className="mt-6">
          <Link to="/events" className="text-[#c09cdf] hover:underline text-lg">
            ← Back to Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
