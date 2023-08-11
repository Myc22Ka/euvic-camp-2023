import React from "react";
import Header from "./Header";
import "../styles/Layout.scss";
import Main from "./Main";

interface ChildrenProps {
  children: React.ReactNode;
}

const Layout: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      {children}
      <Main />
    </div>
  );
};

export default Layout;
