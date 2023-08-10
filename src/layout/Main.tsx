import React from "react";
import Section from "./Section";
import { useFetchEvents } from "../hooks/useFetchEvents";
import Categories from "./Categories";

const Main: React.FC = () => {
  const { data } = useFetchEvents(
    "https://api.predicthq.com/v1/saved-locations/q7r1aSYQ-QjOlmRxJldeNQ/insights/events?category=festivals"
  );

  return (
    <div className="main">
      <Section>
        <Categories />
      </Section>
    </div>
  );
};

export default Main;
