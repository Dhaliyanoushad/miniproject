import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./EventShowcase.css";

const EventShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/events")
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("Failed to load events.");
        setLoading(false);
      });
  }, []);

  const filteredEvents =
    activeCategory === "all"
      ? events
      : events.filter((event) => event.category === activeCategory);

  const placeholderImages = [
    "https://i.pinimg.com/736x/8a/d6/e9/8ad6e94478f3ebcbf731120649caf438.jpg",
    "https://i.pinimg.com/474x/83/00/28/8300288db359ebb374a1a540b2a59e43.jpg",
    "https://i.pinimg.com/736x/b6/a6/f0/b6a6f0a026658fb980c59e222d227b3c.jpg",
    "https://i.pinimg.com/474x/e3/32/17/e332171e9246ca5e0c38cc424a392310.jpg",
    "https://i.pinimg.com/736x/4e/f3/87/4ef387171d07be5516198c780b84e124.jpg",
  ];

  return (
    <section
      className="event-showcase bg-[#0A0618] text-white h-full"
      id="events"
    >
      {/* Navigation Buttons */}
      <div className="flex justify-between mb-6">
        <Link to="/">
          <button className="bg-[#6A5F7E] text-white px-6 py-2 rounded-full hover:bg-[#7A6F8E] transition-all">
            Go Back
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-[#8A7F9E] text-white px-6 py-2 rounded-full hover:bg-[#9A8FB2] transition-all">
            Register
          </button>
        </Link>
      </div>
      <div className="container max-w-6xl mx-auto px-6 py-12">
        <h2 className="section-title text-4xl font-bold text-[#8A7F9E] mb-4">
          Upcoming Events
        </h2>
        <p className="section-subtitle text-gray-400 text-lg mb-8">
          Stay updated with our latest and upcoming events
        </p>

        {/* Category Filter */}
        <div className="category-filter flex flex-wrap gap-4 mb-8">
          {[
            "all",
            "Workshops",
            "Seminars",
            "Hackathons",
            "Cultural",
            "Sports",
            "Technical",
            "Fests",
            "Debates",
            "Career",
          ].map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === category
                  ? "bg-white text-[#1C1C2E]"
                  : "bg-[#1C1C2E] text-gray-400 hover:bg-[#6A5F7E] hover:text-white"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category === "all" ? "All Events" : category}
            </button>
          ))}
        </div>

        {/* Loading and Error Handling */}
        {loading && (
          <p className="text-gray-400 text-center">Loading events...</p>
        )}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Events Grid */}
        {!loading && !error && (
          <div className="events-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div
                  className="event-card bg-[#1C1C2E] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  key={event.id}
                >
                  <div className="event-image relative">
                    <img
                      src={
                        event.image_url ||
                        placeholderImages[
                          Math.floor(Math.random() * placeholderImages.length)
                        ]
                      }
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="event-date absolute top-4 right-4 bg-[#6A5F7E] text-white px-3 py-1 rounded-full text-sm">
                      {event.date}
                    </div>
                  </div>
                  <div className="event-details p-6">
                    <h3 className="text-xl font-bold text-[#8A7F9E] mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{event.description}</p>
                    <p className="text-gray-400">
                      <strong>Location:</strong> {event.venue}
                    </p>
                    <p className="text-gray-400 mb-4">
                      <strong>Date:</strong>{" "}
                      {new Date(event.event_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-gray-400 mb-4">
                      <strong>Time:</strong> {event.event_time}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-8">
                No events found in this category.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventShowcase;
