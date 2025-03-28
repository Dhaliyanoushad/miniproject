import React, { useState } from "react";
import "./PostEvent.css"; // Importing the styles
import { useNavigate } from "react-router-dom";

const PostEvent = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    limit: "",
    category: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventData({ ...eventData, image: file });

      // Generate preview URL
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Upcoming Event Data:", eventData);
    navigate("/hostdashboard");
    // Here you would typically send the data to your backend
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
              name="date"
              value={eventData.date}
              onChange={handleChange}
              className="event-input"
              required
            />
            <input
              type="time"
              name="time"
              value={eventData.time}
              onChange={handleChange}
              className="event-input"
              required
            />
          </div>
          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="Event Venue"
            value={eventData.location}
            onChange={handleChange}
            className="event-input"
            required
          />
          {/* Limit */}
          <input
            type="number"
            name="limit"
            placeholder="Participants Limit"
            value={eventData.limit}
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
              Create Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEvent;
