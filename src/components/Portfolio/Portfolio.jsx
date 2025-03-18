import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import i1 from "../../assets/event1.jpg";
import i2 from "../../assets/event2.jpg";
import i3 from "../../assets/disco.jpg";

const Portfolio = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(null);

  const features = [
    {
      id: "tech-fest",
      title: "Tech Fest",
      tagline: "Empowering Innovation",
      image: i1,
      description:
        "A dynamic event featuring coding challenges, hackathons, and insightful tech discussions with industry leaders.",
      stats: "2,500+ attendees • 30 tech companies • 48-hour event",
    },
    {
      id: "cultural-night",
      title: "Cultural Night",
      tagline: "Celebrating Creativity",
      image: i2,
      description:
        "A spectacular evening showcasing the best of music, dance, drama, and fashion performances.",
      stats: "15 performances • 800+ guests • A night to remember",
    },
    {
      id: "sports-meet",
      title: "Sports Meet",
      tagline: "Where Passion Meets Performance",
      image: i3,
      description:
        "A high-energy sports event featuring competitive matches, athletic challenges, and team spirit at its best.",
      stats: "12 universities • 24 disciplines • World-class facilities",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const elements = document.querySelectorAll(".parallax-element");

      elements.forEach((element) => {
        const speed = element.getAttribute("data-speed") || 0.2;
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="portfolio"
      className="py-24 bg-gradient-to-b from-[#0A0618] to-[#130A2B] text-white overflow-hidden relative"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-r from-[#4A0072] to-[#3A0066] blur-3xl"></div>
        <div className="absolute bottom-40 -right-20 w-80 h-80 rounded-full bg-gradient-to-r from-[#581C87] to-[#4A0072] blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center px-6 lg:px-0 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold tracking-tight">
            Events We Organize
          </h2>
          <p className="mt-5 text-lg text-gray-300 max-w-2xl mx-auto font-light">
            We specialize in crafting engaging, immersive, and impactful events
            that bring people together and create unforgettable experiences.
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 px-4 md:px-0">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-2xl shadow-2xl cursor-pointer"
              style={{ height: "450px" }}
              onMouseEnter={() => setActiveCard(feature.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Image Wrapper with parallax effect */}
              <div className="absolute inset-0 w-full h-full transform transition-transform duration-700 ease-in-out group-hover:scale-110">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* New Image Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#4A0072]/40 to-[#3A0066]/40 opacity-0 group-hover:opacity-70 transition-opacity duration-500 z-10"></div>

              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t 
                ${
                  activeCard === feature.id
                    ? "from-black via-black/60 to-transparent"
                    : "from-black/90 via-black/40 to-transparent"
                } 
                transition-all duration-700 z-20`}
              ></div>

              {/* Content with glass effect */}
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-8 transform transition-all duration-500 ease-in-out z-30">
                <span className="text-xs uppercase tracking-widest text-gray-300 font-medium mb-2 opacity-80">
                  {feature.tagline}
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-white mb-3">
                  {feature.title}
                </h3>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    activeCard === feature.id
                      ? "max-h-60 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-200 mb-4 font-light">
                    {feature.description}
                  </p>
                  <div className="pt-3 border-t border-white/20 text-xs text-gray-300 font-medium">
                    {feature.stats}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-28 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A0072]/10 to-[#3A0066]/10 rounded-3xl blur-xl"></div>
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-[#581C87]/30 to-[#4A0072]/30 blur-3xl rounded-full"></div>

            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-3xl font-bold tracking-tight text-white mb-4">
                Want to bring your event to life?
              </h3>
              <p className="text-gray-300 mb-8">
                Whether it's a corporate gathering, a cultural fest, or a tech
                event, we handle everything with precision and creativity.
              </p>
              <button
                className="group relative px-8 py-4 overflow-hidden rounded-full bg-gradient-to-r from-[#4A0072] to-[#3A0066] text-white font-medium tracking-wide shadow-lg shadow-[#4A0072]/20 hover:shadow-xl hover:shadow-[#4A0072]/30 transition-all duration-300"
                onClick={() => navigate("/register")}
              >
                <span className="relative flex items-center">
                  <span>Plan Your Event With Us</span>
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;
