import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.scss";

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <div className="logo-img"></div>
          <div className="app-name">{process.env.REACT_APP_NAME}</div>
        </Link>
      </div>
      <div className="nav-bar">
        <Link to="sign in">Sign In</Link>
        <Link to="sign out">Sign Out</Link>
      </div>
    </div>
  );
};

export default Header;
