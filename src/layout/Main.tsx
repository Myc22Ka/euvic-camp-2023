import React from "react";
import Section from "./Section";
import Categories from "./Categories";

const Main: React.FC = () => {
  return (
    <div className="main">
      <Section>
        <Categories />
      </Section>
    </div>
  );
};

export default Main;
