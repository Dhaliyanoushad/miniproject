import React, { useRef } from "react";
import "./Navbar.css";
import logo from "/icon.svg";

const Navbar = () => {
  const logoRef = useRef(null);

  const handleLogoClick = () => {
    logoRef.current.classList.add("animate");
    setTimeout(() => {
      logoRef.current.classList.remove("animate");
    }, 1000); // Duration of the animation
  };

  const handleScroll = (id) => {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav className="navbar">
      <img
        src={logo}
        alt="Logo"
        className="logo"
        ref={logoRef}
        onClick={handleLogoClick}
      />
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
