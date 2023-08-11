import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.scss";
import { motion } from "framer-motion";
import { BUTTON_ANIMATION } from "../constants";

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
          <motion.div className="button" {...BUTTON_ANIMATION}>
            <span>Sign In</span>
          </motion.div>
        </Link>
        <Link to="sign out">
          <motion.div className="button" {...BUTTON_ANIMATION}>
            <span className="reverse">Sign Out</span>
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
