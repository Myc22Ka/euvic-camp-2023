import React from "react";
import Header from "./Header";
import "../styles/Layout.scss";

interface ChildrenProps {
  children: React.ReactNode;
}

const Layout: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <div className="layout">{children}</div>
    </React.Fragment>
  );
};

export default Layout;
