import React from "react";
import "./Navbar.css";
import logo from "/icon.svg";

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <img src={logo} alt="Logo" className="logo" />
        <ul className="nav-links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Portfolio</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
        <button className="cta-button">Get Started</button>
      </nav>
    </>
  );
};

export default Navbar;
