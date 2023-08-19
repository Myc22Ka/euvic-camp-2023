import React from "react";
import { Link } from "react-router-dom";

type HeaderProps = {
  home: boolean;
};

const Header: React.FC<HeaderProps> = ({ home }) => {
  return (
    <div className={`header ${home ? "home" : ""}`}>
      <div className="logo-container">
        <Link to="/">
          <div className="logo-img"></div>
          <div className="app-name">{process.env.REACT_APP_NAME}</div>
        </Link>
      </div>
      <div className="nav-bar">
        <div className="category">Categories</div>
        <Link to="sign in">
          <div className="button">Sign In</div>
        </Link>
        <Link to="sign out">
          <div className="button">Sign Out</div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
