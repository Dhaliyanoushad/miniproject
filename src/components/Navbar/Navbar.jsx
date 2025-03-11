import React from "react";
import "./Navbar.css";
import logo from "/icon.svg";

const Navbar = () => {
  const handleScroll = (id) => {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="logo" />
      <ul className="nav-links">
        <li>
          <a onClick={() => handleScroll("home")}>Home</a>
        </li>
        <li>
          <a onClick={() => handleScroll("services")}>Services</a>
        </li>
        <li>
          <a onClick={() => handleScroll("portfolio")}>Portfolio</a>
        </li>
        <li>
          <a onClick={() => handleScroll("contact")}>Contact</a>
        </li>
      </ul>
      <button className="cta-button">Get Started</button>
    </nav>
  );
};

export default Navbar;
