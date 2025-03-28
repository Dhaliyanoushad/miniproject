import React from "react";
import EventDetail from "../components/EventDetails/EventDetails";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const EventDetails = () => {
  return (
    <>
      <Navbar />
      <EventDetail />
      <Footer />
    </>
  );
};

export default EventDetails;
