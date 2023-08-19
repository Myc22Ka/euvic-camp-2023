import React from "react";
import Header from "./Header";
import "../styles/Layout.scss";
import { useLocation } from "react-router-dom";

interface ChildrenProps {
  children: React.ReactNode;
}

const Layout: React.FC<ChildrenProps> = ({ children }) => {
  const location = useLocation();

  return (
    <React.Fragment>
      <Header home={!location.pathname.substring(1)} />
      <div className="layout">{children}</div>
    </React.Fragment>
  );
};

export default Layout;
