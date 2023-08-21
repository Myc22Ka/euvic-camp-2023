import React from "react";
import Carousel from "react-bootstrap/Carousel";

const SLIDER_CONTENT: Array<{ header: string; content: string }> = [
  {
    header: "First slide label",
    content: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  {
    header: "Second slide label",
    content: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  {
    header: "Third slide label",
    content: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  {
    header: "Forth slide label",
    content: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
];

const SliderHome: React.FC = () => {
  return (
    <div className="slider-container">
      <Carousel>
        {SLIDER_CONTENT.map((slide, key) => {
          return (
            <Carousel.Item key={key} interval={5000}>
              <div className={`slider-img img${key}`} />
              <Carousel.Caption>
                <h3>{slide.header}</h3>
                <p>{slide.content}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default SliderHome;
