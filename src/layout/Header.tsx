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
        <div className="category">Categories</div>
        <Link to="sign in">
          <div className="button">
            <span>Sign In</span>
          </div>
        </Link>
        <Link to="sign out">
          <div className="button">
            <span className="reverse">Sign Out</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
