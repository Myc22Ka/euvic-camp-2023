import React from "react";
import Header from "./Header";
import Slider from "../components/Slider";
import "../styles/Layout.scss";
import Main from "./Main";

const Layout: React.FC = () => {
  return (
    <div className="layout">
      <Header />
      <Slider />
      <Main />
    </div>
  );
};

export default Layout;
