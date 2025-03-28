import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Typed from "typed.js";
import "./Events.css";

const events = [
  {
    id: 1,
    title: "Tech Conference 2025",
    description: "A global summit on emerging technologies and AI.",
    date: "April 10, 2025",
    time: "10:00 AM - 5:00 PM",
    location: "Silicon Valley Convention Center",
    category: "Technology",
    image:
      "https://i.pinimg.com/736x/9f/78/c1/9f78c1a6f1d3faf3981f2e0dbee443b5.jpg",
    hostname: "John Doe",
    bookingUrl: "/book/tech-conference",
  },
  {
    id: 2,
    title: "AI & Innovation Summit",
    description: "Exploring the future of artificial intelligence.",
    date: "April 15, 2025",
    time: "2:00 PM - 6:00 PM",
    location: "New York Tech Hub",
    category: "Technology",
    image:
      "https://i.pinimg.com/736x/29/e5/a0/29e5a017f0889357c537427045881dfa.jpg",
    hostname: "Jane Smith",
    bookingUrl: "/book/ai-innovation-summit",
  },
  {
    id: 3,
    title: "Startup Pitch Night",
    description: "An evening of exciting startup pitches and networking.",
    date: "April 20, 2025",
    time: "6:00 PM - 9:00 PM",
    location: "Downtown Incubator",
    category: "Business",
    image:
      "https://i.pinimg.com/736x/68/54/43/685443c0168901fd06c71708a2a105af.jpg",
    hostname: "Michael Lee",
    bookingUrl: "/book/startup-pitch-night",
  },
  {
    id: 4,
    title: "Live Jazz Night",
    description: "Experience a night of mesmerizing jazz music.",
    date: "April 25, 2025",
    time: "8:00 PM - 11:00 PM",
    location: "Blue Note Club",
    category: "Music",
    image:
      "https://i.pinimg.com/736x/b0/0c/1f/b00c1f37e0710a9d64b626f2d523a397.jpg",
    hostname: "Sophia Davis",
    bookingUrl: "/book/live-jazz-night",
  },
  {
    id: 5,
    title: "Art & Culture Exhibition",
    description: "A showcase of contemporary and traditional artwork.",
    date: "April 30, 2025",
    time: "11:00 AM - 4:00 PM",
    location: "City Art Gallery",
    category: "Arts",
    image:
      "https://i.pinimg.com/736x/b6/18/11/b6181147f14cbf318253d7e31db659a8.jpg",
    hostname: "Liam Martinez",
    bookingUrl: "/book/art-culture-exhibition",
  },
];

const Events = () => {
  const el = useRef(null);

  useEffect(() => {
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
  }, []);

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
              <h3 className="text-2xl font-semibold text-[#c09cdf] mt-4">
                {event.title}
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                {event.date} | {event.time}
              </p>
              <p className="text-gray-400 text-sm mt-1">{event.location}</p>
              <p className="text-gray-400 text-sm mt-1">
                Hosted by: {event.hostname}
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
