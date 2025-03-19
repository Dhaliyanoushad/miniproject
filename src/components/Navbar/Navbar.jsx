import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/icon.svg";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // ✅ Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // ✅ Detect which section is in view
      const sections = ["home", "events", "portfolio", "about", "contact"];
      let currentSection = "home"; // Default

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const logoRef = useRef(null);

  const handleLogoClick = () => {
    logoRef.current.classList.add("animate");
    setTimeout(() => {
      logoRef.current.classList.remove("animate");
    }, 2000); // Duration of the animation
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <img
        src={logo}
        alt="Campus Events"
        className="logo"
        ref={logoRef}
        onClick={handleLogoClick}
      />

      <ul className="nav-links">
        {["home", "events", "portfolio", "about", "contact"].map((id) => (
          <li key={id}>
            <a
              onClick={() => handleScrollToSection(id)}
              className={activeSection === id ? "active-link" : ""}
            >
              {id.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase())}{" "}
              {/* Capitalize */}
            </a>
          </li>
        ))}
      </ul>

      {/* ✅ Search Bar for Finding Events */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search events..."
        value={""} // Remove searchQuery if not needed
        onChange={() => {}}
      />

      <button className="cta-button" onClick={() => navigate("/register")}>
        Register Now
      </button>
    </nav>
  );
};

export default Navbar;
