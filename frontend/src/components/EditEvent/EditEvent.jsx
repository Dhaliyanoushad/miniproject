import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; // Make sure axios is installed

const EditEvent = () => {
  const navigate = useNavigate();
  const { eventId } = useParams(); // Get event ID from URL
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    event_date: "", // Changed from "date" to match backend
    event_time: "", // Changed from "time" to match backend
    venue: "", // Changed from "location" to match backend
    participants_limit: "", // Added to match backend
    category: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [preview, setPreview] = useState(null);

  // Get auth token from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch event details from backend
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}//api/events/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Transform backend data to match component state
        const event = response.data;
        setEventData({
          title: event.title,
          description: event.description,
          event_date: event.event_date,
          event_time: event.event_time,
          venue: event.venue,
          participants_limit: event.participants_limit,
          category: event.category,
          image: null,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError("Failed to load event details");
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId, token]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  // Handle file upload
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setEventData({ ...eventData, image: file });

  //     // Generate preview URL
  //     const reader = new FileReader();
  //     reader.onloadend = () => setPreview(reader.result);
  //     reader.readAsDataURL(file);
  //   } else {
  //     setPreview(null);
  //   }
  // };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create form data object for image upload
      const formData = new FormData();
      formData.append("title", eventData.title);
      formData.append("description", eventData.description);
      formData.append("event_date", eventData.event_date);
      formData.append("event_time", eventData.event_time);
      formData.append("venue", eventData.venue);
      formData.append("participants_limit", eventData.participants_limit);
      formData.append("category", eventData.category);

      if (eventData.image) {
        formData.append("image", eventData.image);
      }

      // Send updated event data to backend
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}//api/events/${eventId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Navigate back to host dashboard after successful update
      navigate("/hostdashboard");
    } catch (error) {
      console.error("Error updating event:", error);
      setError("Failed to update event");
    }
  };

  // Handle go back
  const handleGoBack = () => {
    navigate("/hostdashboard");
  };

  if (loading)
    return <div className="event-container">Loading event details...</div>;
  if (error) return <div className="event-container">{error}</div>;

  return (
    <div className="post-event hostd">
      <div className="event-container">
        <h2 className="event-title">Edit Event</h2>
        <form onSubmit={handleSubmit} className="event-form">
          {/* Event Title */}
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={eventData.title}
            onChange={handleChange}
            className="event-input"
            required
          />
          {/* Event Description */}
          <textarea
            name="description"
            placeholder="Event Description"
            value={eventData.description}
            onChange={handleChange}
            rows="4"
            className="event-input"
            required
          ></textarea>
          {/* Date & Time */}
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
          {/* Venue */}
          <input
            type="text"
            name="venue"
            placeholder="Event Venue"
            value={eventData.venue}
            onChange={handleChange}
            className="event-input"
            required
          />
          {/* Participants Limit */}
          <input
            type="number"
            name="participants_limit"
            placeholder="Participants Limit"
            value={eventData.participants_limit}
            onChange={handleChange}
            className="event-input"
            required
          />
          {/* Category */}
          <select
            name="category"
            value={eventData.category}
            onChange={handleChange}
            className="event-input"
            required
          >
            <option value="">Select Event Category</option>
            <option value="Music">Music</option>
            <option value="Business">Business</option>
            <option value="Technology">Technology</option>
            <option value="Arts">Arts & Culture</option>
            <option value="Nightlife">Nightlife</option>
            <option value="Dining">Dining Experiences</option>
            <option value="Networking">Networking</option>
            <option value="Fashion">Fashion & Style</option>
          </select>
          {/* Image Upload */}
          <div className="event-file-group">
            <label className="event-file-label">
              Upload New Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="event-file-input"
            />
            {preview && (
              <img
                src={preview}
                alt="Event Preview"
                className="event-preview"
              />
            )}
          </div>
          {/* Submit and Cancel Buttons */}
          <div className="flex justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={handleGoBack}
              className="event-btn-cancel flex-1 bg-gray-600 hover:bg-gray-700 text-white"
            >
              Cancel
            </button>
            <button type="submit" className="event-btn flex-1">
              Update Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
