import React, { useState } from "react";
import "./PostEvent.css"; // Importing the styles
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostEvent = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    event_date: "",
    event_time: "",
    venue: "",
    participants_limit: "",
    category: "",
    // image: null,
  });

  // const [preview, setPreview] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // // Handle file upload
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
    const token = localStorage.getItem("token");
    console.log("Tokdoolsen:", token);
    console.log("Upcoming Event Data:", eventData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/events`,
        eventData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      alert(response.data.msg);
      console.log(response.data);

      if (response.data.msg === "Event created successfully") {
        navigate("/hostdashboard"); // Redirect on success
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  const handleGoBack = () => {
    navigate("/hostdashboard");
  };

  return (
    <div className="post-event hostd">
      <div className="event-container">
        <h2 className="event-title">Create Event</h2>
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
          {/* Location */}
          <input
            type="text"
            name="venue"
            placeholder="Event Venue"
            value={eventData.venue}
            onChange={handleChange}
            className="event-input"
            required
          />
          {/* Limit */}
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
          {/* <div className="event-file-group">
            <label className="event-file-label">Upload Event Imagery</label>
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
          </div> */}
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
              Create Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEvent;
