import { useEffect, useState } from "react";
import Ticket from "./Ticket";
import TicketBookingConfirmation from "./TicketBookingConfirmation";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GuestD = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("registered");
  const [loading, setLoading] = useState(true);
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
        //await fetchRegisteredEvents(userData.registeredEvents);

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

  // Fetch upcoming events
  useEffect(() => {
    const fetchEvents = async (hostId) => {
      try {
        setLoading(true);
        // Updated endpoint to match the controller with axios
        const response = await axios.get(`http://localhost:5000/events`, {
          withCredentials: true, // Include cookies for auth
        });
        console.log(hostId);
        const data = response.data;

        // Transform API data to match component state structure based on new schema
        const formattedEvents = data.map((event) => ({
          id: event._id,
          name: event.title, // Changed from name to title
          date: event.date,
          time: event.time,
          venue: event.venue,
          category: event.category,
          capacity: event.capacity,
          description: event.description,
          status: event.status,
          // Changed from guests to registeredAttendees
          guests: event.registeredAttendees
            ? event.registeredAttendees.map(
                (attendee) => attendee.name || attendee.fullName
              )
            : [],
          // Assuming guestRequests field may not exist in new schema
          // May need to add a different API endpoint for pending requests
          guestRequests: event.pendingRequests
            ? event.pendingRequests.map(
                (request) => request.name || request.fullName
              )
            : [],
          attendeeCount: event.attendeeCount || 0,
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
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
            <span>My Events</span>
            {registeredEvents.length > 0 && (
              <span className="bg-pink-500/60 text-white px-2 py-0.5 rounded-full text-xs">
                {registeredEvents.length}
              </span>
            )}
          </button>
          <button
            className={`w-full py-3 px-4 rounded-lg flex items-center gap-3 transition duration-300 ${
              activeTab === "upcoming"
                ? "bg-gradient-to-r from-[#7A3B69] to-[#563440] text-white shadow-lg shadow-[#7A3B69]/30"
                : "hover:bg-white/5 text-gray-300"
            }`}
            onClick={() => setActiveTab("upcoming")}
          >
            <span>All Events</span>
            {events.length > 0 && (
              <span className="bg-emerald-500/60 text-white px-2 py-0.5 rounded-full text-xs">
                {events.length}
              </span>
            )}
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
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
            {activeTab === "registered"
              ? "Your Registered Events"
              : "All Available Events"}
          </h1>
          {activeTab === "registered" && registeredEvents.length > 0 && (
            <span className="bg-white/10 text-white px-3 py-1 rounded-lg text-sm">
              Total: {registeredEvents.length} events
            </span>
          )}
          {activeTab === "upcoming" && events.length > 0 && (
            <span className="bg-white/10 text-white px-3 py-1 rounded-lg text-sm">
              Total: {events.length} events
            </span>
          )}
        </div>

        {/* Content Area */}
        <div className="mt-8">
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
                  Browse All Events
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {registeredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-6 rounded-xl border border-white/10 bg-gradient-to-r from-[#563440]/40 to-[#7A3B69]/30 transition duration-300 backdrop-blur-sm hover:shadow-lg hover:border-white/20"
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
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {event.date}
                      </p>
                      <p className="text-gray-300 flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
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
          ) : events.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-xl text-gray-400">
                No events available right now.
              </p>
              <p className="text-gray-300 mt-2">
                Please check back later for upcoming events.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="group relative p-6 rounded-xl border border-white/10 bg-gradient-to-r from-[#563440]/40 to-[#7A3B69]/30 transition duration-300 backdrop-blur-sm overflow-hidden hover:shadow-lg hover:border-white/20"
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
                      <span className="text-pink-200 text-sm font-semibold">
                        {event.price}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2">
                      <p className="text-gray-300 flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {event.date}
                      </p>
                      <p className="text-gray-300 flex items-center gap-2">
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {event.location}
                      </p>
                      <p className="text-pink-200 text-sm">{event.spots}</p>
                    </div>

                    {event.description && (
                      <p className="mt-3 text-gray-300 text-sm line-clamp-2">
                        {event.description}
                      </p>
                    )}

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
