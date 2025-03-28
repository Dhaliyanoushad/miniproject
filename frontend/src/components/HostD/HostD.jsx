import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HostD = () => {
  const navigate = useNavigate();
  // Sample host data - this would typically come from authentication context or API
  const [hostData, setHostData] = useState({
    name: "Daliya Roberts",
    image:
      "https://i.pinimg.com/736x/d6/f8/7c/d6f87ca07ddc580a72ab4314ff238cba.jpg", // Placeholder for host profile image
    role: "Event Organizer",
    eventsHosted: 15,
    joinedDate: "January 2023",
  });

  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Tech Conference 2025",
      date: "2025-04-15",
      guests: ["Alice", "Bob", "Charlie"],
      guestRequests: ["David", "Elena", "Fiona"],
    },
    {
      id: 2,
      name: "AI & Innovation Summit",
      date: "2025-06-10",
      guests: ["David", "Emma", "Frank", "Grace"],
      guestRequests: ["John", "Kate", "Leo"],
    },
    {
      id: 3,
      name: "Startup Pitch Night",
      date: "2025-05-20",
      guests: ["Hannah", "Isaac"],
      guestRequests: ["Michael", "Nina"],
    },
  ]);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [showRequestsForEvent, setShowRequestsForEvent] = useState(null);

  useEffect(() => {
    // Simulate fetching events (Replace this with an actual API call)
    const fetchEvents = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Replace with actual API call: const response = await fetch("/api/events/host");
        // const data = await response.json();
        // setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    // Simulate fetching host data
    const fetchHostData = async () => {
      try {
        // This would be replaced with actual authentication or user data API call
        // const response = await fetch("/api/host/profile");
        // const data = await response.json();
        // setHostData(data);
      } catch (error) {
        console.error("Error fetching host data:", error);
      }
    };

    fetchEvents();
    fetchHostData();
  }, []);

  const handleCreateEvent = () => {
    navigate("/newevent");
  };

  const handleEditEvent = (eventId) => {
    navigate("/editevent");
    console.log(`Edit event ${eventId}`);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await fetch(`/api/events/${eventId}`, { method: "DELETE" }); // Replace with actual API call
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleViewEvent = (eventId) => {
    setExpandedEventId(expandedEventId === eventId ? null : eventId);
    // Close requests view if open for this event
    if (showRequestsForEvent === eventId) {
      setShowRequestsForEvent(null);
    }
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    // Here you would clear auth tokens, user state, etc.
    console.log("Logging out...");
    navigate("/loginhost");
  };

  const handleViewRequests = (eventId) => {
    setShowRequestsForEvent(showRequestsForEvent === eventId ? null : eventId);
    // Close guest list view if open for this event
    if (expandedEventId === eventId) {
      setExpandedEventId(null);
    }
  };

  const handleGuestRequest = (eventId, guestName, action) => {
    setEvents((prevEvents) => {
      return prevEvents.map((event) => {
        if (event.id === eventId) {
          // Create a new event object with updated guests and guestRequests
          const updatedEvent = { ...event };

          // Remove from requests
          updatedEvent.guestRequests = event.guestRequests.filter(
            (request) => request !== guestName
          );

          // Add to guests list if accepted
          if (action === "accept") {
            updatedEvent.guests = [...event.guests, guestName];
          }

          return updatedEvent;
        }
        return event;
      });
    });
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-b from-[#261646] to-[#13001E] text-white hostd">
      {/* Home Button */}
      <button
        onClick={handleHomeClick}
        className="fixed left-6 top-6 bg-gradient-to-r from-[#563440] to-[#7A3B69] text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center"
      >
        Go Home
      </button>

      <div className="max-w-4xl mx-auto">
        {/* Enhanced Host Profile Section */}
        <div className="mb-12 p-8 rounded-2xl bg-gradient-to-r from-[#7A3B69]/80 to-[#563440]/80 backdrop-blur-lg border border-white/20 shadow-2xl transform hover:scale-[1.01] transition-all duration-500">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Image with Glow Effect */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-pink-500/30 blur-xl animate-pulse"></div>
              <img
                src={hostData.image}
                alt="Host profile"
                className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#7A3B69] object-cover shadow-lg"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-pink-200 mb-1">Welcome back,</p>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                {hostData.name}
              </h2>
              <p className="text-gray-300 mt-1">{hostData.role}</p>

              {/* Stats Row */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md">
                  <span className="text-pink-200 font-medium">
                    {events.length}
                  </span>{" "}
                  Current Events
                </div>
                <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md">
                  <span className="text-pink-200 font-medium">
                    {hostData.eventsHosted}
                  </span>{" "}
                  Total Guests
                </div>
                <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md">
                  Member since{" "}
                  <span className="text-pink-200 font-medium">
                    {hostData.joinedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-[#7A3B69]/60 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 hover:bg-[#7A3B69]/80 hover:scale-105 border border-white/10"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6">
          Your Event Dashboard
        </h1>

        {/* Create Event Button */}
        <div className="text-center mb-6">
          <button
            onClick={handleCreateEvent}
            className="bg-gradient-to-r from-[#7A3B69] to-[#563440] text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            + Create Event
          </button>
        </div>

        {/* Event List */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Your Events</h2>

          {events.length === 0 ? (
            <p className="text-gray-400 text-center">No events created yet.</p>
          ) : (
            <ul className="space-y-6">
              {events.map((event) => (
                <li
                  key={event.id}
                  className="relative p-6 rounded-xl bg-gradient-to-r from-[#563440]/40 to-[#7A3B69]/30 backdrop-blur-lg shadow-lg border border-white/10 transition-all duration-300 hover:shadow-xl"
                >
                  {/* Event Title */}
                  <h3 className="text-xl font-bold">{event.name}</h3>
                  <p className="text-gray-300 mt-1">📅 {event.date}</p>
                  <p className="text-gray-300 mt-1">
                    👥 Guests: {event.guests.length}
                  </p>

                  {/* Guest Request Badge */}
                  {event.guestRequests.length > 0 && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {event.guestRequests.length} Requests
                      </span>
                    </div>
                  )}

                  {/* Expanded Event Details */}
                  {expandedEventId === event.id && (
                    <div className="mt-4 p-4 rounded-lg bg-white/10 border border-white/20">
                      <h4 className="font-medium text-lg mb-2">Guest List:</h4>
                      <ul className="list-disc pl-5">
                        {event.guests.map((guest, index) => (
                          <li key={index} className="text-gray-200">
                            {guest}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Guest Requests Section */}
                  {showRequestsForEvent === event.id && (
                    <div className="mt-4 p-4 rounded-lg bg-white/10 border border-white/20">
                      <h4 className="font-medium text-lg mb-2">
                        Guest Requests:
                      </h4>
                      {event.guestRequests.length === 0 ? (
                        <p className="text-gray-300">No pending requests</p>
                      ) : (
                        <ul className="space-y-2">
                          {event.guestRequests.map((guest, index) => (
                            <li
                              key={index}
                              className="flex items-center justify-between bg-white/5 p-2 rounded"
                            >
                              <span className="text-gray-200">{guest}</span>
                              <div className="flex gap-2">
                                <button
                                  onClick={() =>
                                    handleGuestRequest(
                                      event.id,
                                      guest,
                                      "accept"
                                    )
                                  }
                                  className="bg-emerald-500/80 text-white px-3 py-1 rounded transition-all hover:bg-emerald-500"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() =>
                                    handleGuestRequest(
                                      event.id,
                                      guest,
                                      "reject"
                                    )
                                  }
                                  className="bg-red-500/80 text-white px-3 py-1 rounded transition-all hover:bg-red-500"
                                >
                                  Reject
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      onClick={() => handleViewEvent(event.id)}
                      className="bg-[#866A9A]/40 text-white px-3 py-2 rounded-lg shadow-md backdrop-blur-md transition-all duration-300 hover:bg-[#866A9A]/60 hover:scale-105"
                    >
                      {expandedEventId === event.id
                        ? "Hide Guests"
                        : "View Guest List"}
                    </button>

                    {/* New Button for Guest Requests */}
                    <button
                      onClick={() => handleViewRequests(event.id)}
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 ${
                        event.guestRequests.length > 0
                          ? "bg-pink-500/60 hover:bg-pink-500/80"
                          : "bg-[#866A9A]/40 hover:bg-[#866A9A]/60"
                      }`}
                    >
                      {showRequestsForEvent === event.id
                        ? "Hide Requests"
                        : `Requests ${
                            event.guestRequests.length > 0
                              ? `(${event.guestRequests.length})`
                              : ""
                          }`}
                    </button>

                    <button
                      onClick={() => handleEditEvent(event.id)}
                      className="bg-[#866A9A]/40 text-white px-3 py-2 rounded-lg shadow-md backdrop-blur-md transition-all duration-300 hover:bg-[#866A9A]/60 hover:scale-105"
                    >
                      ✏ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="bg-[#7A3B69]/60 text-white px-3 py-2 rounded-lg shadow-md backdrop-blur-md transition-all duration-300 hover:bg-[#7A3B69]/80 hover:scale-105"
                    >
                      🗑 Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostD;
