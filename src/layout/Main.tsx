import React from "react";
import Section from "./Section";
import Categories from "./Categories";

interface ChildrenProps {
  children: React.ReactNode;
}

const Main: React.FC<ChildrenProps> = ({ children }: ChildrenProps) => {
  return (
    <div className="main">
      <Section>{children}</Section>
    </div>
  );
};

export default Main;
