import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Typed from "typed.js";
import axios from "axios";

const Events = () => {
  const el = useRef(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch events from API
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/events");
        setEvents(response.data); // Assuming API returns an array of events
        console.log("Fetched Events:", response.data);
      } catch (err) {
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (el.current) {
      // Ensure ref is not null
      const typed = new Typed(el.current, {
        strings: ["Upcoming Events", "Book Your Tickets Now"],
        typeSpeed: 80,
        backSpeed: 50,
        loop: true,
        showCursor: false,
      });

      return () => {
        typed.destroy();
      };
    }
  }, []);

  if (loading) {
    return <p className="text-center text-white mt-10">Loading events...</p>;
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
    <section id="events" className="bg-[#0A0618] text-white py-12 px-6">
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2
          ref={el}
          className="text-6xl font-bold text-[#d4abf7] typed-text mb-6"
          style={{ display: "inline-block", minHeight: "60px" }}
        >
          Upcoming Events
        </h2>

        {/* Event Carousel */}
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={4000}
          showStatus={false}
          showIndicators={false}
        >
          {events.map((event) => (
            <motion.div
              key={event.event_id}
              className="bg-[#1C1C2E] rounded-lg shadow-md p-6 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={
                  event.image_url ||
                  placeholderImages[
                    Math.floor(Math.random() * placeholderImages.length)
                  ]
                }
                alt={event.title}
                className="w-full h-52 object-cover rounded-md"
              />
              <h3 className="text-2xl font-semibold text-[#c09cdf] mt-4">
                {event.title}
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                {new Date(event.event_date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}{" "}
                | {event.event_time}
              </p>
              <p className="text-gray-400 text-sm mt-1">{event.venue}</p>
              <p className="text-gray-400 text-sm mt-1">
                Category: {event.category}
              </p>
              <a
                href={"/loginguest"}
                className="mt-4 inline-block bg-[#ceb8db] hover:bg-[#815c9c] text-[#1C1C2E] px-6 py-3 rounded-md text-lg font-medium transition"
              >
                Book Now
              </a>
            </motion.div>
          ))}
        </Carousel>
      </motion.div>
    </section>
  );
};

export default Events;
