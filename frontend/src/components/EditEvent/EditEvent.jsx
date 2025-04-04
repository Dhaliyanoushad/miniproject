import React, { useState, useEffect } from "react";
import "./EditEvent.css"; // Reusing the same styles
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditEvent = () => {
  const navigate = useNavigate();
  const { event_id } = useParams(); // Ensure this matches the route in App.js
  console.log("Event ID from URL:", event_id);
  const [isLoading, setIsLoading] = useState(true);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    event_date: "",
    event_time: "",
    venue: "",
    participants_limit: "",
    category: "",
  });

  // Fetch event data when component mounts
  useEffect(() => {
    const fetchEventData = async () => {
      console.log("Event ID:", event_id);

      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/events/${event_id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const event = response.data.event;
        const formattedDate = event.event_date
          ? new Date(event.event_date).toISOString().split("T")[0]
          : "";

        setEventData({
          ...event,
          event_date: formattedDate,
        });

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching event:", err);
        alert("Failed to load event details");
        navigate("/hostdashboard");
      }
    };

    fetchEventData();
  }, [event_id, navigate]);

  // Handle input change
  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Format event_date before sending to backend
    const formattedEventData = {
      ...eventData,
      event_date: eventData.event_date
        ? new Date(eventData.event_date).toISOString().split("T")[0]
        : "",
    };

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/events/${event_id}`,
        formattedEventData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      alert(response.data.msg || "Event updated successfully");
      navigate("/hostdashboard");
    } catch (err) {
      console.error("Error updating event:", err);
      alert(err.response?.data?.msg || "Failed to update event");
    }
  };

  const handleGoBack = () => {
    navigate("/hostdashboard");
  };

  if (isLoading) {
    return (
      <div className="post-event hostd">
        <div className="event-container">
          <h2 className="event-title">Loading event details...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="post-event hostd">
      <div className="event-container">
        <h2 className="event-title">Edit Event</h2>
        <form onSubmit={handleSubmit} className="event-form">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={eventData.title}
            onChange={handleChange}
            className="event-input"
            required
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={eventData.description}
            onChange={handleChange}
            rows="4"
            className="event-input"
            required
          ></textarea>
          <div className="event-flex">
            <input
              type="date"
              name="event_date"
              value={eventData.event_date}
              onChange={handleChange}
              className="event-input"
              required
            />
            <input
              type="time"
              name="event_time"
              value={eventData.event_time}
              onChange={handleChange}
              className="event-input"
              required
            />
          </div>
          <input
            type="text"
            name="venue"
            placeholder="Event Venue"
            value={eventData.venue}
            onChange={handleChange}
            className="event-input"
            required
          />
          <input
            type="number"
            name="participants_limit"
            placeholder="Participants Limit"
            value={eventData.participants_limit}
            onChange={handleChange}
            className="event-input"
            required
          />
          <select
            name="category"
            value={eventData.category}
            onChange={handleChange}
            className="event-input"
            required
          >
            <option value="">Select Event Category</option>
            <option value="Workshops">Workshops</option>
            <option value="Seminars">Seminars</option>
            <option value="Hackathons">Hackathons</option>
            <option value="Cultural">Cultural Festivals</option>
            <option value="Sports">Sports & Games</option>
            <option value="Technical">Technical Events</option>
            <option value="Fests">College Fests</option>
            <option value="Debates">Debates & Discussions</option>
            <option value="Career">Career & Networking</option>
          </select>

          <div className="flex justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={handleGoBack}
              className="event-btn-cancel flex-1 bg-gray-600 hover:bg-gray-700 text-white"
            >
              Cancel
            </button>
            <button type="submit" className="event-btn flex-1">
              Update Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
