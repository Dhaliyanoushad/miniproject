import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./EventShowcase.css";

const EventShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const events = [
    {
      id: 1,
      title: "Tech Conference 2025",
      description: "A global summit on emerging technologies and AI.",
      date: "2025-04-15",
      time: "10:00",
      location: "Silicon Valley Convention Center",
      category: "Technology",
      image:
        "https://i.pinimg.com/736x/9f/78/c1/9f78c1a6f1d3faf3981f2e0dbee443b5.jpg",
      hostname: "John Doe",
    },
    {
      id: 2,
      title: "AI & Innovation Summit",
      description: "Exploring the future of artificial intelligence.",
      date: "2025-06-10",
      time: "14:30",
      location: "New York Tech Hub",
      category: "Technology",
      image:
        "https://i.pinimg.com/736x/29/e5/a0/29e5a017f0889357c537427045881dfa.jpg",
      hostname: "Jane Smith",
    },
    {
      id: 3,
      title: "Startup Pitch Night",
      description: "An evening of exciting startup pitches and networking.",
      date: "2025-05-20",
      time: "18:00",
      location: "Downtown Incubator",
      category: "Business",
      image:
        "https://i.pinimg.com/736x/68/54/43/685443c0168901fd06c71708a2a105af.jpg",
      hostname: "Michael Lee",
    },
    {
      id: 4,
      title: "Live Jazz Night",
      description: "Experience a night of mesmerizing jazz music.",
      date: "2025-07-05",
      time: "20:00",
      location: "Blue Note Club",
      category: "Music",
      image:
        "https://i.pinimg.com/736x/b0/0c/1f/b00c1f37e0710a9d64b626f2d523a397.jpg",
      hostname: "Sophia Davis",
    },
    {
      id: 5,
      title: "Art & Culture Exhibition",
      description: "A showcase of contemporary and traditional artwork.",
      date: "2025-08-12",
      time: "11:00",
      location: "City Art Gallery",
      category: "Arts",
      image:
        "https://i.pinimg.com/736x/b6/18/11/b6181147f14cbf318253d7e31db659a8.jpg",
      hostname: "Liam Martinez",
    },
  ];

  const filteredEvents =
    activeCategory === "all"
      ? events
      : events.filter((event) => event.category === activeCategory);

  return (
    <section
      className="event-showcase bg-[#0A0618] text-white h-full"
      id="events"
    >
      <div className="container max-w-6xl mx-auto px-6 py-12">
        <h2 className="section-title text-4xl font-bold text-[#8A7F9E] mb-4">
          Upcoming Events
        </h2>
        <p className="section-subtitle text-gray-400 text-lg mb-8">
          Stay updated with our latest and upcoming events
        </p>

        <div className="category-filter flex flex-wrap gap-4 mb-8">
          <button
            className={`px-6 py-2 rounded-full transition-all ${
              activeCategory === "all"
                ? "bg-[#6A5F7E] text-white active"
                : "bg-[#1C1C2E] text-gray-400 hover:bg-[#6A5F7E] hover:text-white"
            }`}
            onClick={() => setActiveCategory("all")}
          >
            All Events
          </button>
          <button
            className={`px-6 py-2 rounded-full transition-all ${
              activeCategory === "Technology"
                ? "bg-[#6A5F7E] text-white active"
                : "bg-[#1C1C2E] text-gray-400 hover:bg-[#6A5F7E] hover:text-white"
            }`}
            onClick={() => setActiveCategory("Technology")}
          >
            Technology
          </button>
          <button
            className={`px-6 py-2 rounded-full transition-all ${
              activeCategory === "Business"
                ? "bg-[#6A5F7E] text-white active"
                : "bg-[#1C1C2E] text-gray-400 hover:bg-[#6A5F7E] hover:text-white"
            }`}
            onClick={() => setActiveCategory("Business")}
          >
            Business
          </button>
          <button
            className={`px-6 py-2 rounded-full transition-all ${
              activeCategory === "Music"
                ? "bg-[#6A5F7E] text-white active"
                : "bg-[#1C1C2E] text-gray-400 hover:bg-[#6A5F7E] hover:text-white"
            }`}
            onClick={() => setActiveCategory("Music")}
          >
            Music
          </button>
          <button
            className={`px-6 py-2 rounded-full transition-all ${
              activeCategory === "Arts"
                ? "bg-[#6A5F7E] text-white active"
                : "bg-[#1C1C2E] text-gray-400 hover:bg-[#6A5F7E] hover:text-white"
            }`}
            onClick={() => setActiveCategory("Arts")}
          >
            Arts
          </button>
        </div>

        <div className="events-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <div
              className="event-card bg-[#1C1C2E] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              key={event.id}
            >
              <div className="event-image relative">
                <img
                  src={event.image}
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
                  <strong>Host:</strong> {event.hostname}
                </p>
                <p className="text-gray-400">
                  <strong>Location:</strong> {event.location}
                </p>
                <p className="text-gray-400 mb-4">
                  <strong>Time:</strong> {event.time}
                </p>
                {/* Use Link to navigate to the event details page */}
                <Link to={`/event/${event.id}`}>
                  <button className="view-details-btn bg-[#6A5F7E] text-white px-6 py-2 rounded-full hover:bg-[#7A6F8E] transition-all">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="no-events text-center text-gray-400 py-8">
            <p>No events found in this category. Please check back later!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventShowcase;
