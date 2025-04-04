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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedHost = localStorage.getItem("host");

    if (!token) {
      navigate("/loginhost");
      return;
    }

    if (storedHost) {
      const host = JSON.parse(storedHost);
      setHostData(host);
    }
  }, [navigate]);

  useEffect(() => {
    if (hostData.host_id) {
      getHostEvents(hostData.host_id);
    }
  }, [hostData.host_id]);

  const getHostEvents = async (hostId) => {
    try {
      setLoading(true);
      if (!hostId) return;

      const response = await axios.get("http://localhost:8000/api/events");

      if (response.status !== 200) {
        throw new Error("Failed to fetch events");
      }

      const filteredEvents = response.data.filter(
        (event) => event.host_id === hostId
      );

      setEvents(filteredEvents);
    } catch (error) {
      console.error("Error fetching host events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = () => {
    navigate("/newevent");
  };

  const handleEditEvent = (id) => {
    navigate(`/editevent/${id}`);
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
        prevEvents.filter((event) => event.event_id !== eventId)
      );

      alert("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event");
    }
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/loginhost");
  };

  const handleGuestRequest = async (eventId, guestId, action) => {
    try {
      const token = localStorage.getItem("token");
      const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

      const response = await axios.patch(
        `${baseUrl}/api/events/${eventId}/guests/${guestId}`,
        { booking_status: action },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update local state after successful API call
      setEvents((prevEvents) => {
        return prevEvents.map((event) => {
          if (event.event_id === eventId) {
            // Update the registered_guests array by changing the status of the specified guest
            const updatedPendingGuests = event.registered_guests.filter(
              (guest) => guest.guest_id !== guestId
            );

            return {
              ...event,
              registered_guests: updatedPendingGuests,
            };
          }
          return event;
        });
      });

      alert(
        action === "Confirm"
          ? "Guest approved successfully"
          : "Guest rejected successfully"
      );
    } catch (error) {
      console.error("Error updating guest status:", error);
      alert(`Failed to update guest status: ${error.message}`);
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
    <div className="min-h-screen p-4 bg-gradient-to-b from-[#261646] to-[#13001E] text-white">
      {/* Header with Home and Logout */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleHomeClick}
          className="bg-gradient-to-r from-[#563440] to-[#7A3B69] text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
        >
          Go Home
        </button>

        <h1 className="text-2xl font-bold">Host Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-[#7A3B69]/60 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 hover:bg-[#7A3B69]/80 hover:scale-105"
        >
          Logout
        </button>
      </div>

      {/* Host Profile */}
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-[#7A3B69]/80 to-[#563440]/80 border border-white/20 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-pink-500/30 flex items-center justify-center overflow-hidden border-2 border-[#7A3B69]">
            {hostData.image ? (
              <img
                src={hostData.image}
                alt="Host"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl">👤</span>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold">{hostData.fullname}</h2>
            <p className="text-gray-300">{hostData.department}</p>
          </div>
        </div>
      </div>

      {/* Create Event Button */}
      <div className="text-center mb-6">
        <button
          onClick={handleCreateEvent}
          className="bg-gradient-to-r from-[#7A3B69] to-[#563440] text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
        >
          + Create Event
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Your Events</h2>

        {events.length === 0 ? (
          <p className="text-gray-400 text-center p-4 bg-white/5 rounded-lg">
            No events created yet.
          </p>
        ) : (
          events.map((event) => {
            // Filter pending guests (those with "Pending" status)
            const pendingGuests =
              event.registered_guests?.filter(
                (guest) => guest.booking_status === "Pending"
              ) || [];

            return (
              <div
                key={event.event_id}
                className="p-4 rounded-lg bg-white/10 border border-white/20"
              >
                {/* Event Details */}
                <div className="mb-2">
                  <h3 className="text-lg font-bold">{event.title}</h3>
                  <p className="text-gray-300">📅 {event.date}</p>
                  <p className="text-gray-300">📍 {event.location}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-2 mb-4">
                  <button
                    onClick={() => handleEditEvent(event.event_id)}
                    className="bg-[#866A9A]/40 text-white px-3 py-1 rounded-lg shadow-md transition-all duration-300 hover:bg-[#866A9A]/60"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.event_id)}
                    className="bg-[#7A3B69]/60 text-white px-3 py-1 rounded-lg shadow-md transition-all duration-300 hover:bg-[#7A3B69]/80"
                  >
                    Delete
                  </button>
                </div>

                {/* Guest Requests Section */}
                <div className="mt-3">
                  <h4 className="font-medium border-b border-white/20 pb-1 mb-2">
                    Guest Requests{" "}
                    {pendingGuests.length > 0 && `(${pendingGuests.length})`}
                  </h4>

                  {pendingGuests.length === 0 ? (
                    <p className="text-gray-400 text-sm p-2">
                      No pending requests
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {pendingGuests.map((guest) => (
                        <div
                          key={guest.name}
                          className="flex justify-between items-center bg-white/5 p-2 rounded"
                        >
                          <div>
                            <p className="text-sm font-medium">{guest.name}</p>
                            <p className="text-xs text-gray-400">
                              {guest.email}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                handleGuestRequest(
                                  event.event_id,
                                  guest.guest_id,
                                  "Confirm"
                                )
                              }
                              className="bg-green-500/80 text-white px-2 py-1 rounded text-sm hover:bg-green-500"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleGuestRequest(
                                  event.event_id,
                                  guest.guest_id,
                                  "Reject"
                                )
                              }
                              className="bg-red-500/80 text-white px-2 py-1 rounded text-sm hover:bg-red-500"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HostD;
