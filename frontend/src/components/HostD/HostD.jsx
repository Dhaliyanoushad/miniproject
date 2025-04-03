import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HostD = () => {
  const navigate = useNavigate();
  const [hostData, setHostData] = useState({
    fullname: "",
    email: "",
    department: "",
    phone_number: "",
    joinedDate: "",
  });

  const [events, setEvents] = useState([]);
  const [expandedEventId, setExpandedEventId] = useState(null);
  const [showRequestsForEvent, setShowRequestsForEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedHost = localStorage.getItem("host");
    console.log("Token:", token);
    console.log("Stored Host:", JSON.parse(storedHost));

    if (!token) {
      navigate("/loginhost");
      return;
    }

    if (storedHost) {
      const host = JSON.parse(storedHost);
      setHostData(host);
      console.log("Host Data:", host);
    }
    const getHostEvents = async () => {
      try {
        // Fetch all events
        const response = await axios.get("http://localhost:8000/api/events");

        if (response.status !== 200) {
          throw new Error("Failed to fetch events");
        }
        const allEvents = response.data;
        // Filter events hosted by this host
        const filteredEvents = allEvents.filter(
          (event) => event.host_id === hostData.host_id
        );

        // Optionally, update your state if needed
        setEvents(filteredEvents);
        // console.log("Filtered Events:", events);

        // Map required details for each event:
        // Only include pending guests (if booking_status is "Pending")
        // const hostEventsMapped = filteredEvents.map((event) => {
        //   const pendingGuests = event.pending_guests.filter(
        //     (guest) => guest.booking_status === "Pending"
        //   );
        //   return {
        //     event_id: event.event_id,
        //     title: event.title,
        //     pending_guest_count: pendingGuests.length,
        //     pending_guest_names: pendingGuests.map((guest) => guest.name),
        //   };
        // });

        // return hostEventsMapped;
      } catch (error) {
        console.error("Error fetching host events:", error);
        return [];
      }
    };

    // Call the function to fetch host events

    // Example usage inside a React component

    getHostEvents();

    // const fetchHostData = async () => {
    //   try {
    //     const response = await axios.get(
    //       `${import.meta.env.VITE_BASE_URL}/api/events`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );

    //     if (!response.data) {
    //       throw new Error("No data returned from API");
    //     }

    //     setRegisteredEvents(response.data);

    //     const hostEvents = response.data.map((event) => ({
    //       ...event,
    //       guestRequests: [],
    //       guests: [],
    //     }));

    //     for (const event of hostEvents) {
    //       try {
    //         const guestsResponse = await axios.get(
    //           `${import.meta.env.VITE_BASE_URL}/api/events/${
    //             event.event_id
    //           }/guests`,
    //           {
    //             headers: {
    //               Authorization: `Bearer ${token}`,
    //             },
    //           }
    //         );

    //         if (guestsResponse.data) {
    //           event.guestRequests =
    //             guestsResponse.data.pending_guests?.map((g) => g.name) || [];
    //           event.guests =
    //             guestsResponse.data.approved_guests?.map((g) => g.name) || [];
    //         }
    //       } catch (error) {
    //         console.error(
    //           `Error fetching guests for event ${event.event_id}:`,
    //           error
    //         );
    //       }
    //     }

    //     setEvents(hostEvents);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);

    //     if (error.message.includes("token")) {
    //       localStorage.removeItem("token");
    //       navigate("/loginhost");
    //     }
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchHostData();
  }, [navigate]); // Removed the misplaced closing brace and fixed the dependency array

  const fetchEvents = async () => {
    console.log("Fetching events...", events);
  };

  // Call the function to fetch events
  fetchEvents();

  const handleCreateEvent = () => {
    navigate("/newevent"); // Updated to match your route
  };

  const handleEditEvent = (id) => {
    navigate(`/editevent/${id}`); // Updated to match your route
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

      await axios.delete(`${baseUrl}/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove event from state
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );

      alert("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event");
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
    localStorage.removeItem("token");
    navigate("/loginhost");
  };

  const handleViewRequests = (eventId) => {
    setShowRequestsForEvent(showRequestsForEvent === eventId ? null : eventId);
    // Close guest list view if open for this event
    if (expandedEventId === eventId) {
      setExpandedEventId(null);
    }
  };

  const handleGuestRequest = async (eventId, guestName, action) => {
    try {
      const token = localStorage.getItem("token");
      const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

      console.log("Request params:", {
        eventId,
        guestName,
        action,
        booking_status: action === "accept" ? "Approved" : "Rejected",
      });

      // Make the API call with the correct parameters
      const response = await axios.patch(
        `${baseUrl}/api/events/${eventId}/guests/${guestName}`,
        { booking_status: action === "accept" ? "Approved" : "Rejected" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Response:", response.data);

      // Update local state only after successful API call
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === eventId
            ? {
                ...event,
                guestRequests: event.guestRequests.filter(
                  (request) => request !== guestName
                ),
                guests:
                  action === "accept"
                    ? [...event.guests, guestName]
                    : event.guests,
              }
            : event
        )
      );

      alert(
        action === "accept"
          ? "Guest approved successfully"
          : "Guest rejected successfully"
      );
    } catch (error) {
      console.error("Error updating guest status:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        alert(
          `Failed to update guest status: ${
            error.response.data.msg || error.message
          }`
        );
      } else {
        alert(`Failed to update guest status: ${error.message}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#261646] to-[#13001E] text-white">
        <div className="text-xl">Loading...</div>
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
        {/* Host Profile Section */}
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
                {hostData.fullname}
              </h2>
              <p className="text-gray-300 mt-1">{hostData.department}</p>

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
                    {events.reduce(
                      (total, event) => total + event.guests.length,
                      0
                    )}
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
                      {event.guests.length === 0 ? (
                        <p className="text-gray-300">No guests yet</p>
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
