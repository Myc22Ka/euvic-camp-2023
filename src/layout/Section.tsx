import React, { ReactNode } from "react";
import "../styles/Section.scss";

type SectionProps = {
  children: ReactNode;
};

const Section: React.FC<SectionProps> = ({ children }) => {
  return <div className="section">{children}</div>;
};

export default Section;
