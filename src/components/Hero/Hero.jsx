import React, { useEffect, useRef } from "react";
import "./Hero.css";
import dj from "../../assets/dj.jpg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const heroRef = useRef(null);
  const navigate = useNavigate();

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
    <div id="home" className="hero-section">
      <div className="hero-content" ref={heroRef}>
        <h1>
          Discover. Participate. <br /> Elevate Your College Life!
        </h1>
        <p>
          Stay updated with upcoming events, register with ease, and create
          unforgettable experiences on campus.
        </p>
        <div className="hero-buttons">
          <button className="explore-btn" onClick={() => navigate("/events")}>
            Explore Events
          </button>
          <button
            className="get-app-btn"
            onClick={() => navigate("/loginhost")}
          >
            Host an Event
          </button>
        </div>
      </div>
      <div className="hero-images-container">
        <div className="left-column">
          <img
            src={
              "https://i.pinimg.com/736x/b8/27/72/b82772b767aba5dc69eb6c182d93ff0e.jpg"
            }
            alt="Students enjoying a college fest"
            className="event-images formal-event"
          />
          <img
            src={
              "https://i.pinimg.com/736x/4e/f3/87/4ef387171d07be5516198c780b84e124.jpg"
            }
            alt="Workshops and competitions happening"
            className="event-images holiday-decor"
          />
        </div>
        <div className="right-column">
          <img
            src={
              "https://i.pinimg.com/736x/5c/10/43/5c10434dd62c1ba01fbb28aaf096c642.jpg"
            }
            alt="Music festival on campus"
            className="event-images dinner-event"
          />
        </div>
      </div>

      <div className="hero-image" style={{ backgroundImage: `url(${dj})` }}>
        <div className="image-overlay"></div>
      </div>
    </div>
  );
};

export default Hero;
