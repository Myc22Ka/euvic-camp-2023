import React from "react";
import Header from "./Header";
import Slider from "../components/Slider";

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Header />
      <Slider />
    </div>
  );
};

export default Layout;
