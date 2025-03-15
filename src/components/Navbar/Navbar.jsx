import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "/icon.svg";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <img src={logo} alt="Logo" className="logo" />

      <ul className="nav-links">
        <li>
          <a onClick={() => handleScrollToSection("home")}>Home</a>
        </li>
        <li>
          <a onClick={() => handleScrollToSection("services")}>Events</a>
        </li>
        <li>
          <a onClick={() => handleScrollToSection("portfolio")}>About</a>
        </li>
        <li>
          <a onClick={() => handleScrollToSection("contact")}>Contact</a>
        </li>
        <li>
          <a onClick={() => handleScrollToSection("contact")}>Dools</a>
        </li>
      </ul>

      {/* ✅ Transparent Search Bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <button className="cta-button" onClick={() => navigate("/signin")}>
        Register
      </button>
    </nav>
  );
};

export default Navbar;
