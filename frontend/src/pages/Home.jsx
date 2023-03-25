import React from "react";
import Nav from "../components/Nav";
import DisasterSlider from "../components/DisasterSlider";
import Stats from "../components/Stats";
import Quotes from "../components/Quotes";
import Divider from "../components/Divider";
import AboutUs from "../components/AboutUs";
import Footer from "../components/_Footer";

const Home = () => {
  return (
    <>
      <Nav isHome={true} />
      <DisasterSlider />
      <Stats />
      <Quotes />
      <Divider text="About Us" />
      <AboutUs />
      <Footer />
    </>
  );
};

export default Home;
