import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Typed from "typed.js";
import "./Events.css";
import { nav } from "framer-motion/client";

const events = [
  {
    id: 1,
    title: "Tech Conference 2025",
    image:
      "https://i.pinimg.com/736x/b7/f1/7f/b7f17fa063b83f236918f9a1f0e87201.jpg",
    date: "April 10, 2025",
    time: "10:00 AM - 5:00 PM",
    bookingUrl: "/book/tech-conference",
  },
  {
    id: 2,
    title: "AI & ML Workshop",
    image:
      "https://i.pinimg.com/736x/b7/f1/7f/b7f17fa063b83f236918f9a1f0e87201.jpg",
    date: "April 15, 2025",
    time: "2:00 PM - 6:00 PM",
    bookingUrl: "/book/ai-ml-workshop",
  },
  {
    id: 3,
    title: "Cybersecurity Summit",
    image:
      "https://i.pinimg.com/736x/b7/f1/7f/b7f17fa063b83f236918f9a1f0e87201.jpg",
    date: "April 20, 2025",
    time: "9:00 AM - 4:00 PM",
    bookingUrl: "/book/cybersecurity-summit",
  },
  {
    id: 4,
    title: "Blockchain Expo",
    image:
      "https://i.pinimg.com/736x/b7/f1/7f/b7f17fa063b83f236918f9a1f0e87201.jpg",
    date: "April 25, 2025",
    time: "11:00 AM - 3:00 PM",
    bookingUrl: "/book/blockchain-expo",
  },
];

const Events = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Upcoming Events.", "Book Your Tickets Now."],
      typeSpeed: 80,
      backSpeed: 50,
      loop: true,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <section id="events" className="bg-[#0F0F1A] text-white py-12 px-6">
      <motion.div
        className="max-w-6xl mx-auto text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2
          ref={el}
          className="text-6xl font-bold text-purple-300 typed-text mb-6"
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
              key={event.id}
              className="bg-[#1C1C2E] rounded-lg shadow-md p-6 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-52 object-cover rounded-md"
              />
              <h3 className="text-2xl font-semibold text-purple-300 mt-4">
                {event.title}
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                📅 {event.date} | ⏰ {event.time}
              </p>
              <a
                href={"/loginguest"}
                className="mt-4 inline-block bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-md text-lg font-medium transition"
              >
                🎟️ Book Now
              </a>
            </motion.div>
          ))}
        </Carousel>
      </motion.div>
    </section>
  );
};

export default Events;
