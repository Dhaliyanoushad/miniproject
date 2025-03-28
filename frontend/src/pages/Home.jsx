import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import Portfolio from "../components/Portfolio/Portfolio";
import Events from "../components/Events/Events";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import TicketCounter from "../components/TicketCounter/TicketCounter";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Events />
      <TicketCounter />
      <Portfolio />
      <Features />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
