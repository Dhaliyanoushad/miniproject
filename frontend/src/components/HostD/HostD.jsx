import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HostD = () => {
  const navigate = useNavigate();
  const [hostData, setHostData] = useState({
    fullName: "",
    profileImage: "",
    department: "",
    eventsHosted: 0,
    joinedDate: "",
  });

  const [events, setEvents] = useState([]);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [showRequestsForEvent, setShowRequestsForEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    pastEvents: 0,
    totalGuests: 0,
    pendingRequests: 0,
  });

  useEffect(() => {
    // Fetch host profile data
    const fetchHostData = async () => {
      try {
        setLoading(true);
        // Updated endpoint to match the controller with axios
        const response = await axios.get(
          "http://localhost:5000/hosts/current",
          {
            withCredentials: true, // Include cookies for auth (axios equivalent to credentials: "include")
          }
        );

        const data = response.data;
        setHostData({
          fullName: data.fullName,
          profileImage:
            data.profileImage ||
            "https://i.pinimg.com/736x/d6/f8/7c/d6f87ca07ddc580a72ab4314ff238cba.jpg",
          department: data.department,
          eventsHosted: data.events ? data.events.length : 0,
          joinedDate: new Date(data.createdAt || Date.now()).toLocaleDateString(
            "en-US",
            { year: "numeric", month: "long" }
          ),
        });
      } catch (error) {
        console.error("Error fetching host data:", error);
        // Handle 401 errors for authentication issues
        if (error.response && error.response.status === 401) {
          navigate("/loginhost");
          return;
        }
        setError("Failed to load profile data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // Fetch host events with updated schema fields
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

        // Calculate statistics with updated schema fields
        let pendingRequests = 0;
        let totalGuests = 0;
        let upcomingEvents = 0;
        let pastEvents = 0;

        data.forEach((event) => {
          if (event.pendingRequests)
            pendingRequests += event.pendingRequests.length;
          if (event.registeredAttendees)
            totalGuests += event.registeredAttendees.length;

          // Use status field instead of date comparison
          if (event.status === "upcoming") {
            upcomingEvents++;
          } else if (
            event.status === "completed" ||
            event.status === "cancelled"
          ) {
            pastEvents++;
          }
        });

        setStats({
          totalEvents: data.length,
          upcomingEvents,
          pastEvents,
          totalGuests,
          pendingRequests,
        });
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    // Run all fetch operations
    fetchHostData();
    fetchEvents();
  }, [navigate]);

  const handleCreateEvent = () => {
    navigate("/newevent");
  };

  const handleEditEvent = (eventId) => {
    navigate(`/editevent/${eventId}`);
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      await axios.delete(`/events/${eventId}`, {
        withCredentials: true, // Equivalent to credentials: "include"
      });

      // Remove the event from state
      setEvents(events.filter((event) => event.id !== eventId));

      // Update stats
      setStats((prevStats) => ({
        ...prevStats,
        totalEvents: prevStats.totalEvents - 1,
      }));
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event. Please try again.");
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

  const handleLogout = async () => {
    try {
      // Call logout endpoint
      await axios.post(
        "http://localhost:5000/hosts/logout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      // Navigate to login page regardless of success/failure
      navigate("/loginhost");
    }
  };

  const handleViewRequests = async (eventId) => {
    // Toggle request view
    if (showRequestsForEvent === eventId) {
      setShowRequestsForEvent(null);
      return;
    }

    // Fetch requests for this specific event
    try {
      // Updated endpoint to fetch pending requests for an event
      const response = await fetch(
        `http://localhost:5000/hosts/events/${eventId}/requests`,
        {
          credentials: "include", // Include cookies for auth
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch requests: ${response.statusText}`);
      }

      const requestsData = await response.json();

      // Update the events state with the fetched requests
      setEvents((prevEvents) =>
        prevEvents.map((event) => {
          if (event.id === eventId) {
            return {
              ...event,
              guestRequests: requestsData.map(
                (req) => req.user?.name || req.user?.fullName || "Guest"
              ),
            };
          }
          return event;
        })
      );

      // Show the requests section
      setShowRequestsForEvent(eventId);

      // Close guest list view if open for this event
      if (expandedEventId === eventId) {
        setExpandedEventId(null);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      alert("Failed to load guest requests. Please try again.");
    }
  };

  const handleGuestRequest = async (eventId, requestId, action) => {
    try {
      // Updated to match the controller API
      const response = await fetch(
        `http://localhost:5000/hosts/requests/${requestId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies for auth
          body: JSON.stringify({ action }), // 'accept' or 'reject'
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to handle guest request: ${response.statusText}`
        );
      }

      // Refresh the event requests after handling the request
      const updatedRequestsResponse = await fetch(
        `/hosts/events/${eventId}/requests`,
        {
          credentials: "include", // Include cookies for auth
        }
      );

      if (!updatedRequestsResponse.ok) {
        throw new Error(
          `Failed to refresh requests: ${updatedRequestsResponse.statusText}`
        );
      }

      const updatedRequestsData = await updatedRequestsResponse.json();

      // Update the events state with the refreshed requests and attendee count
      setEvents((prevEvents) =>
        prevEvents.map((event) => {
          if (event.id === eventId) {
            return {
              ...event,
              guestRequests: updatedRequestsData.map(
                (req) => req.user?.name || req.user?.fullName || "Guest"
              ),
              // If action was accept, also update the attendee count
              attendeeCount:
                action === "accept"
                  ? event.attendeeCount + 1
                  : event.attendeeCount,
              // If action was accept, also add the guest to the guest list
              guests:
                action === "accept"
                  ? [...event.guests, requestId]
                  : event.guests,
            };
          }
          return event;
        })
      );

      // Update stats
      if (action === "accept") {
        setStats((prevStats) => ({
          ...prevStats,
          totalGuests: prevStats.totalGuests + 1,
          pendingRequests: prevStats.pendingRequests - 1,
        }));
      } else {
        setStats((prevStats) => ({
          ...prevStats,
          pendingRequests: prevStats.pendingRequests - 1,
        }));
      }
    } catch (error) {
      console.error("Error handling guest request:", error);
      alert(`Failed to ${action} guest request. Please try again.`);
    }
  };

  if (loading && !hostData.fullName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#261646] to-[#13001E] text-white">
        <div className="animate-pulse text-2xl">Loading...</div>
      </div>
    );
  }

  if (error && !hostData.fullName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#261646] to-[#13001E] text-white">
        <div className="text-red-400 text-xl max-w-md text-center p-6 bg-white/10 rounded-lg">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-[#7A3B69]/60 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
                src={hostData.profileImage}
                alt="Host profile"
                className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#7A3B69] object-cover shadow-lg"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-pink-200 mb-1">Welcome back,</p>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                {hostData.fullName}
              </h2>
              <p className="text-gray-300 mt-1">{hostData.department}</p>

              {/* Stats Row */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md">
                  <span className="text-pink-200 font-medium">
                    {stats.totalEvents}
                  </span>{" "}
                  Total Events
                </div>
                <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md">
                  <span className="text-pink-200 font-medium">
                    {stats.totalGuests}
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

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r from-[#563440]/40 to-[#7A3B69]/30 backdrop-blur-lg p-4 rounded-xl text-center">
            <p className="text-gray-300">Upcoming Events</p>
            <p className="text-2xl font-bold text-pink-200">
              {stats.upcomingEvents}
            </p>
          </div>
          <div className="bg-gradient-to-r from-[#563440]/40 to-[#7A3B69]/30 backdrop-blur-lg p-4 rounded-xl text-center">
            <p className="text-gray-300">Past Events</p>
            <p className="text-2xl font-bold text-pink-200">
              {stats.pastEvents}
            </p>
          </div>
          <div className="bg-gradient-to-r from-[#563440]/40 to-[#7A3B69]/30 backdrop-blur-lg p-4 rounded-xl text-center">
            <p className="text-gray-300">Pending Requests</p>
            <p className="text-2xl font-bold text-pink-200">
              {stats.pendingRequests}
            </p>
          </div>
        </div>

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
            <div className="p-6 rounded-xl bg-gradient-to-r from-[#563440]/40 to-[#7A3B69]/30 backdrop-blur-lg text-center">
              <p className="text-gray-400">No events created yet.</p>
              <p className="text-gray-400 mt-2">
                Click the "Create Event" button above to get started!
              </p>
            </div>
          ) : (
            <ul className="space-y-6">
              {events.map((event) => (
                <li
                  key={event.id}
                  className="relative p-6 rounded-xl bg-gradient-to-r from-[#563440]/40 to-[#7A3B69]/30 backdrop-blur-lg shadow-lg border border-white/10 transition-all duration-300 hover:shadow-xl"
                >
                  {/* Event Title */}
                  <h3 className="text-xl font-bold">{event.name}</h3>
                  <div className="flex flex-wrap gap-2 my-2">
                    <span className="bg-[#7A3B69]/40 text-xs px-2 py-1 rounded-full">
                      {event.category}
                    </span>
                    <span className="bg-[#7A3B69]/40 text-xs px-2 py-1 rounded-full">
                      Status: {event.status}
                    </span>
                  </div>
                  <p className="text-gray-300 mt-1">
                    📅 {new Date(event.date).toLocaleDateString()} at{" "}
                    {new Date(event.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-gray-300 mt-1">📍 {event.venue}</p>
                  <p className="text-gray-300 mt-1">
                    👥 Attendees: {event.attendeeCount}/{event.capacity}
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
                      <h4 className="font-medium text-lg mb-2">
                        Attendee List:
                      </h4>
                      {event.guests.length === 0 ? (
                        <p className="text-gray-300">
                          No attendees have registered for this event yet.
                        </p>
                      ) : (
                        <ul className="list-disc pl-5">
                          {event.guests.map((guest, index) => (
                            <li key={index} className="text-gray-200">
                              {guest}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Guest Requests Section */}
                  {showRequestsForEvent === event.id && (
                    <div className="mt-4 p-4 rounded-lg bg-white/10 border border-white/20">
                      <h4 className="font-medium text-lg mb-2">
                        Registration Requests:
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
                        ? "Hide Attendees"
                        : "View Attendees"}
                    </button>

                    {/* Button for Registration Requests */}
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
