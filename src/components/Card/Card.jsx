import React from "react";
import "./Card.css"; // Import the separated CSS file

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
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    <path d="M8 11c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm8 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z" />
    <path d="M12 17c2.33 0 4.29-1.59 4.84-3.75H7.16C7.71 15.41 9.67 17 12 17z" />
  </svg>
);

const Card = () => {
  return (
    <div className="landing-container">
      {/* Blue glow effect */}
      <div className="blue-glow"></div>

      <div className="header-section">
        <button className="why-choose-button">Why Choose Equinox</button>

        <h1 className="main-heading">
          Unlock the Full Potential of{" "}
          <span className="italic">Your Business</span>
        </h1>

        <p className="subheading">
          Our SaaS solution is designed to provide you with the tools and
          insights you need to drive growth and efficiency. Here's how we can
          help you achieve your business goals.
        </p>
      </div>

      <div className="features-container">
        {/* Feature 1 */}
        <div className="feature-card">
          <div className="icon-container">
            <IntegrationIcon />
          </div>
          <h3 className="feature-title">Seamless integration</h3>
          <p className="feature-description">
            Easily integrate with your existing systems and workflows, reducing
            downtime and ensuring a smooth transition.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="feature-card">
          <div className="icon-container">
            <ProductivityIcon />
          </div>
          <h3 className="feature-title">Enhanced Productivity</h3>
          <p className="feature-description">
            Automate repetitive tasks and streamline processes to free up time
            for what matters most - growing your business.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="feature-card">
          <div className="icon-container">
            <SupportIcon />
          </div>
          <h3 className="feature-title">Superior Support</h3>
          <p className="feature-description">
            Access our dedicated support team 24/7 to resolve any issues quickly
            and keep your operations running smoothly.
          </p>
        </div>
        {/* Feature 3 */}
        <div className="feature-card">
          <div className="icon-container">
            <SupportIcon />
          </div>
          <h3 className="feature-title">VYSHNAV C H</h3>
          <p className="feature-description">
            Access our dedicated support team 24/7 to resolve any issues quickly
            and keep your operations running smoothly.
          </p>
        </div>
      </div>

      <div className="cta-section">
        <button className="cta-button">Start your free trial</button>
        <a href="#features" className="learn-more">
          More about our features →
        </a>
      </div>
    </div>
  );
};

export default Card;
