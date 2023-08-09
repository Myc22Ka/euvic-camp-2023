import React from "react";
import Header from "./Header";
import Slider from "../components/Slider";
import "../styles/Layout.scss";

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Header />
      <Slider />
      main
    </div>
  );
};

export default Layout;
