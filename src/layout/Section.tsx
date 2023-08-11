import React from "react";
import "../styles/Section.scss";
import { ChildrenProps } from "../types/types";

const Section: React.FC<ChildrenProps> = ({ children }) => {
  return <div className="section">{children}</div>;
};

export default Section;
