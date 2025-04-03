import { useEffect, useState } from "react";
import Ticket from "./Ticket";
import TicketBookingConfirmation from "./TicketBookingConfirmation";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GuestD = () => {
  const navigate = useNavigate();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("registered");
  const [searchQuery, setSearchQuery] = useState("");
  const [guestProfile, setGuestProfile] = useState({});
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [bookingEvent, setBookingEvent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const guest = JSON.parse(localStorage.getItem("guest"));

    setGuestProfile({
      ...guest,
      joined: `${new Date(guest.joined).toLocaleString("en-US", {
        month: "long",
      })} ${new Date(guest.joined).getFullYear()}`,
    });

    if (!token) {
      navigate("/loginguest");
      return;
    }

    // Set dummy data immediately
    const fetchRegisteredEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/events/eventbookings/${
            guest.id
          }`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log("dools", response.data);

        if (response.data && response.data) {
          // Transform API data to match your UI structure
          // Assuming the API returns an array of registered events

          setRegisteredEvents(response.data);
        }
      } catch (error) {
        console.error("Error fetching registered events:", error);
      }
    };

    const fetchUpcomingEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/events`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.data && Array.isArray(response.data)) {
          // Format API response

          setUpcomingEvents(response.data);
          console.log("upcomingEvents", upcomingEvents);
        }
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      }
    };

    fetchRegisteredEvents();
    fetchUpcomingEvents();
  }, [navigate]); // Removed upcomingEvents from dependencies

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

  const handleBookTicket = async (eventId) => {
    const event = upcomingEvents.find((event) => event.event_id === eventId);
    if (!event) return;

    const confirmBooking = window.confirm(
      `Do you want to book a ticket for ${event.title}?`
    );
    if (!confirmBooking) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/events/bookticket`,
        { guest_id: guestProfile.id, event_id: eventId },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      if (response.status === 200) {
        alert(`Ticket booked for ${event.title}!`); // Changed from event.name to event.title
        handleConfirmBooking(event);
      } else {
        alert("Failed to book ticket. Please try again.");
      }
    } catch (error) {
      console.error("Error booking ticket:", error);
      alert("An error occurred while booking. Please try again.");
    }
  };

  const handleCloseBooking = () => {
    setBookingEvent(null);
  };

  const handleConfirmBooking = (confirmedEvent) => {
    const newRegisteredEvent = {
      ...confirmedEvent,
      id:
        Math.max(
          ...[...registeredEvents, ...upcomingEvents].map((e) => e.id),
          0
        ) + 1,
      status: "Confirmed",
    };

    setRegisteredEvents((prev) => [...prev, newRegisteredEvent]);
    console.log(`Successfully booked ticket for ${confirmedEvent.name}`);
    setActiveTab("registered");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/loginhost");
  };

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
            Member since {guestProfile.joined}
          </p>
          <p className="text-gray-300 text-s mt-1">
            Student ID:{guestProfile.student_id}
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
          <button
            onClick={handleLogout}
            className="w-full bg-[#7A3B69]/60 hover:bg-[#7A3B69]/80 py-3 rounded-lg font-bold shadow-lg shadow-[#7A3B69]/20 transition duration-300"
          >
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
          {/* Search Bar and Date Filter for Upcoming Events */}
          {activeTab === "upcoming" && (
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Event Type Filter */}
              <div className="relative flex-1">
                <select
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 rounded-xl bg-white/10 border border-white/20 text-white 
                    focus:outline-none focus:ring-2 focus:ring-[#7A3B69]/40 transition appearance-none"
                >
                  <option value="" className="bg-[#261646]">
                    All Event Types
                  </option>
                  <option value="Startup" className="bg-[#261646]">
                    Startup
                  </option>
                  <option value="Technology" className="bg-[#261646]">
                    Technology
                  </option>
                  <option value="AI" className="bg-[#261646]">
                    AI
                  </option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
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
                        {event.title}
                      </h3>
                      <span
                        className={`px-2 pt-2 pb-1 rounded-full text-xs font-semibold ${
                          event.booking_status === "Pending"
                            ? "bg-yellow-300 text-black"
                            : event.booking_status === "Confirmed"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {event.booking_status}
                      </span>
                    </div>
                    <div className="mt-4 space-y-2">
                      <p className="text-gray-300 flex items-center gap-2">
                        {event.date}
                      </p>
                      <p className="text-gray-300 flex items-center gap-2">
                        {event.venue}
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
          ) : upcomingEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-xl text-gray-400">No matching events found.</p>
              <p className="text-gray-300 mt-2">
                Try adjusting your search criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <div
                  key={event.event_id}
                  className="group relative p-6 rounded-xl border border-white/10 bg-gradient-to-r from-[#563440]/40 to-[#7A3B69]/30 transition duration-300 backdrop-blur-sm overflow-hidden"
                >
                  {/* <div className="absolute inset-0 bg-white/5 transform scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500"></div> */}

                  <div className="relative">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="inline-block px-2 py-1 bg-[#866A9A]/40 text-white text-xs rounded-full mb-2">
                          {event.category}
                        </span>
                        <h3 className="text-xl font-bold text-white">
                          {event.title}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <p className="text-gray-300">
                        {new Date(event.event_date).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                      <p className="text-gray-300">{event.venue}</p>
                      <p className="text-gray-300">
                        <span className="text-pink-200 text-sm">
                          {event.participants_limit} seats available
                        </span>
                      </p>
                    </div>

                    <button
                      onClick={() => handleBookTicket(event.event_id)}
                      disabled={registeredEvents.some(
                        (regEvent) => regEvent.event_id === event.event_id
                      )}
                      className={`mt-6 w-full py-3 px-4 rounded-lg font-medium transition ${
                        registeredEvents.some(
                          (regEvent) => regEvent.event_id === event.event_id
                        )
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-gradient-to-r from-[#563440] to-[#7A3B69] text-white hover:shadow-lg"
                      }`}
                    >
                      {registeredEvents.some(
                        (regEvent) => regEvent.event_id === event.event_id
                      )
                        ? "Already Booked"
                        : "Reserve Your Spot"}
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
