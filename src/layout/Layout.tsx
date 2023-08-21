import React from "react";
import Header from "./Header";
import "../styles/Layout.scss";
import { useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

interface ChildrenProps {
  children: React.ReactNode;
}

const Layout: React.FC<ChildrenProps> = ({ children }) => {
  const location = useLocation();
  const { theme } = useTheme();

  return (
    <React.Fragment>
      <Header home={!location.pathname.substring(1)} />
      <div className={`layout ${theme}-mode`}>{children}</div>
    </React.Fragment>
  );
};

export default Layout;
