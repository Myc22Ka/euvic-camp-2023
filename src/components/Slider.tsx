import React from "react";
import defaultImg from "../assets/img/default-img.jpg";

const Slider: React.FC = () => {
  return (
    <div className="slider-container">
      <img src={defaultImg} alt="default-img" title="default-img" className="slider-img" />
    </div>
  );
};

export default Slider;
