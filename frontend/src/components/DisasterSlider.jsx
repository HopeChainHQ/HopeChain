import React from "react";
import { Carousel } from "flowbite-react";
import DroughtImage from "../assets/images/Disasters/Drought.jpg";
import FloodImage from "../assets/images/Disasters/Flood.jpg";
import EarthImage from "../assets/images/Disasters/Earthquake.jpg";

const DisasterSlider = () => {
  // let disasterImages = [];
  return (
    <>
      <div className="h-[21rem] sm:h-[24rem] xl:h-[90vh] my-[0px] md:my-[72px]">
        <Carousel slideInterval={2500}>
          <img src={DroughtImage} alt="Drought" />
          <img src={FloodImage} alt="Flood" />
          <img src={EarthImage} alt="Earthquake" />
        </Carousel>
      </div>
    </>
  );
};

export default DisasterSlider;
