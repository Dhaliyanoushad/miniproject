import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const TicketCounter = () => {
  const [data, setData] = useState({
    ticketsSold: 0,
    participants: 0,
    hosts: 0,
  });

  useEffect(() => {
    // Fetch data from your backend API
    const fetchData = async () => {
      try {
        const response = await fetch("YOUR_API_ENDPOINT"); // Replace with your API URL
        const result = await response.json();
        setData({
          ticketsSold: result.ticketsSold,
          participants: result.participants,
          hosts: result.hosts,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const counters = [
    {
      label: "Tickets Sold",
      value: data.ticketsSold,
      color: "text-[#8A7F9E]", // Nude violet
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 opacity-80 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
          />
        </svg>
      ),
    },
    {
      label: "Participants",
      value: data.participants,
      color: "text-[#7A6F8E]", // Muted violet
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 opacity-80 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
    {
      label: "Hosts",
      value: data.hosts,
      color: "text-[#6A5F7E]", // Darker muted violet
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 opacity-80 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[#1E1A2B] to-[#2A2438] text-white px-6 py-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#8A7F9E]/10 to-[#7A6F8E]/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#7A6F8E]/10 to-[#6A5F7E]/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="relative z-10 w-full max-w-6xl">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Event <span className="text-[#8A7F9E]">Statistics</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#7A6F8E] to-[#6A5F7E] rounded-full mx-auto"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Track our progress in real-time as we continue to grow and create
            unforgettable experiences.
          </p>
        </motion.div>

        {/* Counter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          {counters.map((counter, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-[#7A6F8E]/10 transition-all duration-300 text-center flex flex-col items-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className={`${counter.color} mb-1`}>{counter.icon}</div>
              <h2 className="text-xl font-medium text-gray-200 mb-3">
                {counter.label}
              </h2>
              <p className={`text-5xl font-bold ${counter.color}`}>
                <CountUp end={counter.value} duration={3} separator="," />
              </p>

              {/* Decorative line */}
              <div className="w-16 h-1 bg-white/10 rounded-full mt-4"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketCounter;
