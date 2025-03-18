import React from "react";
import "./Features.css"; // Import the separated CSS file

// SVG icons as React components
const IntegrationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="#4F8CF7"
    width="50"
    height="50"
  >
    <path d="M7 2L5 5L2 7L5 9L7 12L9 9L12 7L9 5L7 2Z" />
    <path d="M17 12L15 15L12 17L15 19L17 22L19 19L22 17L19 15L17 12Z" />
    <path d="M12 7L7 12L12 17L17 12L12 7Z" />
  </svg>
);

const ProductivityIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="#4F8CF7"
    width="50"
    height="50"
  >
    <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
  </svg>
);

const SupportIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="#4F8CF7"
    width="50"
    height="50"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8 8 8-3.59 8-8-3.59 8-8 8z" />
    <path d="M8 11c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 1 1z" />
    <path d="M12 17c2.33 0 4.29-1.59 4.84-3.75H7.16C7.71 15.41 9.67 17 12 17z" />
  </svg>
);

const Features = () => {
  const handleClick = () => {
    window.location.href = "/register";
  };
  return (
    <div id="about" className="card-container">
      {/* Blue glow effect */}
      <div className="card-blue-glow"></div>

      <div className="card-header-section">
        <button className="card-why-choose-button">
          Why Choose Our Platform
        </button>

        <h1 className="card-main-heading">
          Streamline Your <span className="card-italic">College Events</span>
        </h1>

        <p className="card-subheading">
          Our event management platform simplifies planning, registration, and
          execution. Manage everything from tech fests to cultural nights with
          ease.
        </p>
      </div>

      <div className="card-features-container">
        {/* Feature 1 */}
        <div className="card-feature-card">
          <div className="card-icon-container">
            <IntegrationIcon />
          </div>
          <h3 className="card-feature-title">Hassle-Free Registrations</h3>
          <p className="card-feature-description">
            Manage participant sign-ups effortlessly with automated registration
            and real-time updates.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="card-feature-card">
          <div className="card-icon-container">
            <ProductivityIcon />
          </div>
          <h3 className="card-feature-title">Seamless Scheduling</h3>
          <p className="card-feature-description">
            Organize events with an intuitive dashboard, ensuring zero clashes
            and smooth coordination.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="card-feature-card">
          <div className="card-icon-container">
            <SupportIcon />
          </div>
          <h3 className="card-feature-title">Real-Time Updates</h3>
          <p className="card-feature-description">
            Keep participants and organizers informed with instant notifications
            and schedule changes.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="card-feature-card">
          <div className="card-icon-container">
            <SupportIcon />
          </div>
          <h3 className="card-feature-title">Volunteer Coordination</h3>
          <p className="card-feature-description">
            Assign tasks, track progress, and ensure smooth execution with
            built-in volunteer management tools.
          </p>
        </div>
      </div>

      <div className="card-cta-section">
        <button className="card-cta-button" onClick={handleClick}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Features;
