import { useEffect, useState } from "react";
import Ticket from "./Ticket";
import TicketBookingConfirmation from "./TicketBookingConfirmation";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GuestD = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("registered");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState({
    type: "none", // "none", "before", "after", "between"
    date1: "",
    date2: "",
  });
  const [guestProfile, setGuestProfile] = useState({
    name: "Loading...",
    joinDate: "",
    image:
      "https://i.pinimg.com/736x/16/e1/cb/16e1cb84a53ee8cb0e7d8fe72533568e.jpg", // Default image
  });
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [bookingEvent, setBookingEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch current user data
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "http://localhost:5000/users/profile",
          {
            withCredentials: true, // Important for cookies/session
          }
        );

        const userData = response.data;
        console.log(userData.fullName);

        // Format join date from user data
        const joinDate = new Date(userData.createdAt || Date.now());
        const formattedJoinDate = joinDate.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        });

        setGuestProfile({
          name: userData.fullName || "Guest User",
          joinDate: formattedJoinDate,
          image:
            userData.profilePicture ||
            "https://i.pinimg.com/736x/16/e1/cb/16e1cb84a53ee8cb0e7d8fe72533568e.jpg",
          collegeName: userData.collageName || "", // Added from schema
          studentId: userData.studentIdNumber || "", // Added from schema
        });

        // Fetch registered events for the user
        await fetchRegisteredEvents(userData.registeredEvents);

        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("Failed to load user profile");
        setIsLoading(false);

        // Redirect to login if unauthorized
        if (err.response && err.response.status === 401) {
          navigate("/loginguest");
        }
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  // Fetch registered events from IDs
  const fetchRegisteredEvents = async (eventIds) => {
    if (!eventIds || eventIds.length === 0) {
      setRegisteredEvents([]);
      return;
    }

    try {
      const response = await axios.get("/events/registered", {
        params: { eventIds: eventIds.join(",") },
        withCredentials: true,
      });

      // Transform data to match the expected format
      const transformedEvents = response.data.map((event) => ({
        id: event._id,
        name: event.title || event.name,
        date: new Date(event.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        location: event.location || "Not specified",
        status: "Confirmed", // Default status
        // Add any other relevant fields from your Event schema
      }));

      setRegisteredEvents(transformedEvents);
    } catch (error) {
      console.error("Failed to fetch registered events:", error);
      setError("Failed to load your registered events");
    }
  };

  // Fetch upcoming events
  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await axios.get("/events/upcoming", {
          withCredentials: true,
        });

        // Transform data to match the expected format
        const transformedEvents = response.data.map((event) => ({
          id: event._id,
          name: event.title || event.name,
          type: event.category || "Event",
          date: new Date(event.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
          location: event.location || "Not specified",
          spots: event.availableSpots
            ? `${event.availableSpots} spots left`
            : "Available",
          price: event.price ? `$${event.price}` : "Free",
        }));

        setUpcomingEvents(transformedEvents);
      } catch (error) {
        console.error("Failed to fetch upcoming events:", error);
        // Use dummy data as fallback if API fails
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
        setUpcomingEvents(dummyUpcomingEvents);
      }
    };

    fetchUpcomingEvents();
  }, []);

  const filterEventsByDate = (events) => {
    if (dateFilter.type === "none") return events;

    return events.filter((event) => {
      const eventDate = new Date(event.date);

      switch (dateFilter.type) {
        case "before":
          return eventDate < new Date(dateFilter.date1);
        case "after":
          return eventDate > new Date(dateFilter.date1);
        case "between":
          return (
            eventDate > new Date(dateFilter.date1) &&
            eventDate < new Date(dateFilter.date2)
          );
        default:
          return true;
      }
    });
  };

  const handleViewTicket = (eventId) => {
    const event = registeredEvents.find((event) => event.id === eventId);
    if (event) {
      setSelectedTicket(event);
    }
  };

  const handleCloseTicket = () => {
    setSelectedTicket(null);
  };

  const handleCancelRegistration = async (eventId) => {
    try {
      await axios.post(
        "/events/cancel-registration",
        { eventId },
        { withCredentials: true }
      );

      // Update UI after successful cancellation
      setRegisteredEvents(
        registeredEvents.filter((event) => event.id !== eventId)
      );
    } catch (error) {
      console.error("Failed to cancel registration:", error);
      // Show error message to user
      alert("Failed to cancel registration. Please try again.");
    }
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

  const handleConfirmBooking = async (confirmedEvent) => {
    try {
      // Register for the event via API
      await axios.post(
        "/events/register",
        { eventId: confirmedEvent.id },
        { withCredentials: true }
      );

      // Update registered events after successful registration
      const updatedRegisteredEvent = {
        ...confirmedEvent,
        status: "Confirmed",
      };

      setRegisteredEvents((prev) => [...prev, updatedRegisteredEvent]);
      console.log(`Successfully booked ticket for ${confirmedEvent.name}`);
      setActiveTab("registered");
    } catch (error) {
      console.error("Failed to book event:", error);
      alert("Failed to book event. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      // Call logout endpoint
      await axios.post(
        "http://localhost:5000/users/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      // Navigate to login page regardless of success/failure
      navigate("/loginguest");
    }
  };

  // Get unique event types for filter dropdown
  const eventTypes = [...new Set(upcomingEvents.map((event) => event.type))];

  const filteredUpcomingEvents = upcomingEvents
    .filter(
      (event) =>
        searchQuery === "" ||
        event.type.toLowerCase() === searchQuery.toLowerCase()
    )
    .filter(filterEventsByDate);

  // Show loading state while fetching user data
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#261646] to-[#13001E] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#261646] to-[#13001E] text-white">
        <div className="text-center p-8 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
          <p className="text-xl text-pink-300 mb-4">{error}</p>
          <button
            onClick={() => navigate("/loginguest")}
            className="bg-[#7A3B69]/60 hover:bg-[#7A3B69]/80 py-3 px-6 rounded-lg font-bold shadow-lg shadow-[#7A3B69]/20 transition duration-300"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

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
          {guestProfile.collegeName && (
            <p className="text-gray-300 text-xs mt-1">
              {guestProfile.collegeName}
            </p>
          )}
          {guestProfile.studentId && (
            <p className="text-gray-300 text-xs mt-1">
              ID: {guestProfile.studentId}
            </p>
          )}
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
                  {eventTypes.map((type) => (
                    <option key={type} value={type} className="bg-[#261646]">
                      {type}
                    </option>
                  ))}
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

              {/* Date Filter Type */}
              <div className="relative">
                <select
                  value={dateFilter.type}
                  onChange={(e) =>
                    setDateFilter({ ...dateFilter, type: e.target.value })
                  }
                  className="w-full pl-4 pr-10 py-3 rounded-xl bg-white/10 border border-white/20 text-white 
                    focus:outline-none focus:ring-2 focus:ring-[#7A3B69]/40 transition appearance-none"
                >
                  <option value="none" className="bg-[#261646]">
                    All Dates
                  </option>
                  <option value="before" className="bg-[#261646]">
                    Before Date
                  </option>
                  <option value="after" className="bg-[#261646]">
                    After Date
                  </option>
                  <option value="between" className="bg-[#261646]">
                    Between Dates
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

              {/* Date input 1 */}
              {dateFilter.type !== "none" && (
                <div className="relative flex-1">
                  <input
                    type="date"
                    value={dateFilter.date1}
                    onChange={(e) =>
                      setDateFilter({ ...dateFilter, date1: e.target.value })
                    }
                    className="w-full pl-4 pr-10 py-3 rounded-xl bg-white/10 border border-white/20 text-white 
                      focus:outline-none focus:ring-2 focus:ring-[#7A3B69]/40 transition"
                  />
                </div>
              )}

              {/* Date input 2 (only for between filter) */}
              {dateFilter.type === "between" && (
                <div className="relative flex-1">
                  <input
                    type="date"
                    value={dateFilter.date2}
                    onChange={(e) =>
                      setDateFilter({ ...dateFilter, date2: e.target.value })
                    }
                    className="w-full pl-4 pr-10 py-3 rounded-xl bg-white/10 border border-white/20 text-white 
                      focus:outline-none focus:ring-2 focus:ring-[#7A3B69]/40 transition"
                  />
                </div>
              )}
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
