import React, { useEffect, useRef } from "react";
import "./Hero.css";
import eventImage from "../../assets/dj.jpg";

const HeroSection = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          heroRef.current.classList.add("show");
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(heroRef.current);
  }, []);

  return (
    <div className="hero-section">
      <div className="hero-content" ref={heroRef}>
        <h1>
          Turn Moments
          <br /> into Memories
        </h1>
        <p>Your one-stop solution for seamless event management.</p>
        <div className="hero-buttons">
          <button className="explore-btn">Explore</button>
          <button className="get-app-btn">Get App</button>
        </div>
      </div>
      <div
        className="hero-image"
        style={{ backgroundImage: `url(${eventImage})` }}
      >
        <div className="image-overlay"></div>
      </div>
    </div>
  );
};

export default HeroSection;
