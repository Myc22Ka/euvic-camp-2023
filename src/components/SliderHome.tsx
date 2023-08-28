import React, { useMemo } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useEventsContext } from "../context/EventContext";

const SliderHome: React.FC = () => {
  const { events } = useEventsContext();

  const SLIDER_CONTENT = useMemo(() => {
    const filteredEvents = events.filter((e) => e.results[0].description);

    if (!filteredEvents) return [];

    return filteredEvents.slice(0, 4).map((e) => {
      return {
        header: e.results[0].title,
        content: `${e.results[0].description.split(" ").slice(0, 30).join(" ")}${
          30 > e.results[0].description.split(" ").length ? "" : "..."
        }`,
      };
    });
  }, [events]);

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
