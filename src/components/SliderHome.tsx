import React, { useMemo } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useEventsContext } from "../context/EventContext";

const SliderHome: React.FC = () => {
  const { events, loading } = useEventsContext();

  const SLIDER_CONTENT = useMemo(() => {
    const filteredEvents = events.filter((e) => e.results[0].description);

    if (loading) return Array(3).fill({ header: "", content: "" });

    return filteredEvents.slice(0, 3).map((e) => {
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
        <Carousel.Item interval={5000}>
          <div className={`slider-img img0`} />
          <Carousel.Caption>
            <h3>Urban Art Unleashed</h3>
            <p>
              Immerse yourself in a world of creativity at &quot;Urban Art Unleashed&quot;. Witness the streets come
              alive with captivating murals, graffiti, and innovative installations, showcasing the raw energy of
              contemporary urban art.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        {SLIDER_CONTENT.map((slide, key) => {
          return (
            <Carousel.Item key={key} interval={5000}>
              <div className={`slider-img img${key + 1}`} />
              <Carousel.Caption>
                <h3>{slide?.header || ""}</h3>
                <p>{slide?.content || ""}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default SliderHome;
