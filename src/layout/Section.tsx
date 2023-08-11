import React from "react";
import "../styles/Section.scss";

interface ChildrenProps {
  children: React.ReactNode;
}

const Section: React.FC<ChildrenProps> = ({ children }) => {
  return <div className="section">{children}</div>;
};

export default Section;
