import React from "react";
import { FaUserTie, FaUser, FaKey, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

const AuthPage = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      {/* Host Section */}
      <div className="auth-section host">
        <div className="auth-content">
          <div className="auth-icon-container">
            <FaUserTie className="auth-icon" />
            <FaCalendarAlt className="auth-icon-secondary" />
          </div>
          <h2 className="auth-title">Event Creator</h2>
          <p className="auth-text">
            Craft premium experiences and manage exclusive events
          </p>
          <button
            className="auth-btn primary"
            onClick={() => navigate("/loginhost")}
          >
            Access Creator Portal
          </button>
          <button
            className="auth-btn secondary"
            onClick={() => navigate("/signuphost")}
          >
            Register as Creator
          </button>
        </div>
      </div>

      {/* Guest Section */}
      <div className="auth-section guest">
        <div className="auth-content">
          <div className="auth-icon-container">
            <FaUser className="auth-icon" />
            <FaKey className="auth-icon-secondary" />
          </div>
          <h2 className="auth-title">Event Explorer</h2>
          <p className="auth-text">
            Discover curated experiences and exclusive gatherings
          </p>
          <button
            className="auth-btn primary"
            onClick={() => navigate("/loginguest")}
          >
            Enter Your Space
          </button>
          <button
            className="auth-btn secondary"
            onClick={() => navigate("/signupguest")}
          >
            Join the Community
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
