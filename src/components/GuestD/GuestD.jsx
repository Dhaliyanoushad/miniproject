import { useEffect, useState } from "react";
import Ticket from "./Ticket"; // Import the Ticket component
import TicketBookingConfirmation from "./TicketBookingConfirmation"; // Import the new component

const GuestD = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("registered");
  const [searchQuery, setSearchQuery] = useState("");
  const [guestProfile, setGuestProfile] = useState({
    name: "Alex Morgan",
    joinDate: "March 2024",
    image:
      "https://i.pinimg.com/736x/16/e1/cb/16e1cb84a53ee8cb0e7d8fe72533568e.jpg",
  });
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [bookingEvent, setBookingEvent] = useState(null); // New state for booking modal

  useEffect(() => {
    const dummyRegisteredEvents = [
      {
        id: 1,
        name: "Tech Innovation Summit",
        date: "April 15, 2025",
        location: "Main Auditorium",
        status: "Confirmed",
      },
      {
        id: 2,
        name: "AI & Robotics Workshop",
        date: "May 5, 2025",
        location: "Lab 3, Tech Block",
        status: "Pending",
      },
    ];

    const dummyUpcomingEvents = [
      {
        id: 3,
        name: "Startup Pitch Fest",
        type: "Startup",
        date: "June 20, 2025",
        location: "Convention Center",
        spots: "Limited spots",
        price: "$149",
      },
      {
        id: 4,
        name: "Blockchain Summit",
        type: "Technology",
        date: "July 10, 2025",
        location: "Conference Hall B",
        spots: "Filling fast",
        price: "$199",
      },
      {
        id: 5,
        name: "AI Ethics Conference",
        type: "AI",
        date: "August 18, 2025",
        location: "Hall A",
        spots: "Available",
        price: "$129",
      },
    ];

    setRegisteredEvents(dummyRegisteredEvents);
    setUpcomingEvents(dummyUpcomingEvents);
  }, []);

  const handleViewTicket = (eventId) => {
    const event = registeredEvents.find((event) => event.id === eventId);
    if (event) {
      setSelectedTicket(event);
    }
  };

  const handleCloseTicket = () => {
    setSelectedTicket(null);
  };

  const handleCancelRegistration = (eventId) => {
    setRegisteredEvents(
      registeredEvents.filter((event) => event.id !== eventId)
    );
  };

  const handleBookTicket = (eventId) => {
    const event = upcomingEvents.find((event) => event.id === eventId);
    if (event) {
      setBookingEvent(event);
    }
  };

  const handleCloseBooking = () => {
    setBookingEvent(null);
  };

  // Handle confirmation of a new booking
  const handleConfirmBooking = (confirmedEvent) => {
    // Add to registered events with a new ID
    const newRegisteredEvent = {
      ...confirmedEvent,
      // Generate a higher ID than existing events
      id:
        Math.max(...[...registeredEvents, ...upcomingEvents].map((e) => e.id)) +
        1,
    };

    setRegisteredEvents((prev) => [...prev, newRegisteredEvent]);

    // Remove from upcomingEvents or keep it (depending on requirements)
    // If you want to keep it in upcoming events, comment out the next line
    // setUpcomingEvents(prev => prev.filter(event => event.id !== confirmedEvent.id));

    // Show a success message (could be implemented as a toast notification)
    console.log(`Successfully booked ticket for ${confirmedEvent.name}`);

    // Optional: Switch to registered events tab
    setActiveTab("registered");
  };

  const filteredUpcomingEvents = upcomingEvents.filter((event) =>
    event.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#261646] to-[#13001E] text-white">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-[#7A3B69]/80 to-[#563440]/80 p-8 flex flex-col shadow-xl border border-white/20">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-pink-500/30 blur-md"></div>
            <img
              src={guestProfile.image}
              alt="Guest Profile"
              className="relative w-24 h-24 rounded-full border-4 border-[#7A3B69] object-cover"
            />
          </div>
          <h2 className="mt-4 text-xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
            Welcome, {guestProfile.name}
          </h2>
          <p className="text-gray-300 text-xs mt-1">
            Member since {guestProfile.joinDate}
          </p>
        </div>

        <div className="mt-10 w-full space-y-2">
          <button
            className={`w-full py-3 px-4 rounded-lg flex items-center gap-3 transition duration-300 ${
              activeTab === "registered"
                ? "bg-gradient-to-r from-[#7A3B69] to-[#563440] text-white shadow-lg shadow-[#7A3B69]/30"
                : "hover:bg-white/5 text-gray-300"
            }`}
            onClick={() => setActiveTab("registered")}
          >
            <span>Registered Events</span>
          </button>
          <button
            className={`w-full py-3 px-4 rounded-lg flex items-center gap-3 transition duration-300 ${
              activeTab === "upcoming"
                ? "bg-gradient-to-r from-[#7A3B69] to-[#563440] text-white shadow-lg shadow-[#7A3B69]/30"
                : "hover:bg-white/5 text-gray-300"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            <span>Upcoming Events</span>
          </button>
        </div>

        <div className="mt-auto w-full pt-6">
          <button className="w-full bg-[#7A3B69]/60 hover:bg-[#7A3B69]/80 py-3 rounded-lg font-bold shadow-lg shadow-[#7A3B69]/20 transition duration-300">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
            {activeTab === "registered"
              ? "Your Registered Events"
              : "Discover Events"}
          </h1>
        </div>

        {/* Content Area */}
        <div className="mt-8">
          {/* Search Bar for Upcoming Events */}
          {activeTab === "upcoming" && (
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-pink-200"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by event type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#7A3B69]/40 transition"
              />
            </div>
          )}

          {activeTab === "registered" ? (
            registeredEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-xl text-gray-400 mb-3">
                  You haven't registered for any events yet.
                </p>
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className="mt-4 bg-gradient-to-r from-[#7A3B69] to-[#563440] px-4 py-2 rounded-lg text-white font-medium hover:shadow-lg transition"
                >
                  Discover Events
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {registeredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-6 rounded-xl border border-white/10 bg-gradient-to-r from-[#563440]/40 to-[#7A3B69]/30 transition duration-300 backdrop-blur-sm"
                  >
                    <div className="flex justify-between">
                      <h3 className="text-xl font-bold text-white">
                        {event.name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          event.status === "Confirmed"
                            ? "bg-emerald-500/80 text-white"
                            : "bg-pink-500/60 text-white"
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>
                    <div className="mt-4 space-y-2">
                      <p className="text-gray-300 flex items-center gap-2">
                        {event.date}
                      </p>
                      <p className="text-gray-300 flex items-center gap-2">
                        {event.location}
                      </p>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => handleViewTicket(event.id)}
                        className="flex-1 bg-[#866A9A]/40 hover:bg-[#866A9A]/60 px-4 py-2 text-white rounded-lg font-medium transition"
                      >
                        View Ticket
                      </button>
                      <button
                        onClick={() => handleCancelRegistration(event.id)}
                        className="bg-[#7A3B69]/60 hover:bg-[#7A3B69]/80 px-4 py-2 text-white rounded-lg transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : filteredUpcomingEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-xl text-gray-400">No matching events found.</p>
              <p className="text-gray-300 mt-2">
                Try adjusting your search criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUpcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="group relative p-6 rounded-xl border border-white/10 bg-gradient-to-r from-[#563440]/40 to-[#7A3B69]/30 transition duration-300 backdrop-blur-sm overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/5 transform scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500"></div>

                  <div className="relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="inline-block px-2 py-1 bg-[#866A9A]/40 text-white text-xs rounded-full mb-2">
                          {event.type}
                        </span>
                        <h3 className="text-xl font-bold text-white">
                          {event.name}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <p className="text-gray-300">{event.date}</p>
                      <p className="text-gray-300">{event.location}</p>
                      <p className="text-gray-300">
                        <span className="text-pink-200 text-sm">
                          {event.spots}
                        </span>
                      </p>
                    </div>

                    <button
                      onClick={() => handleBookTicket(event.id)}
                      className="mt-6 w-full bg-gradient-to-r from-[#563440] to-[#7A3B69] py-3 px-4 text-white rounded-lg font-medium hover:shadow-lg transition"
                    >
                      Reserve Your Spot
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Ticket Modal */}
      {selectedTicket && (
        <Ticket
          guestName={guestProfile.name}
          event={selectedTicket}
          onClose={handleCloseTicket}
        />
      )}

      {/* Booking Confirmation Modal */}
      {bookingEvent && (
        <TicketBookingConfirmation
          event={bookingEvent}
          onClose={handleCloseBooking}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
};

export default GuestD;
