import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { useTheme } from "../context/ThemeContext";

type HeaderProps = {
  home: boolean;
};

const Header: React.FC<HeaderProps> = ({ home }) => {
  const { theme, changeTheme } = useTheme();

  return (
    <div className={`${home ? "home header" : "header"} ${theme}-mode`}>
      <div className="logo-container">
        <Link to="/">
          <div className="logo-img"></div>
          <div className="app-name">
            {process.env.REACT_APP_NAME?.split("-")
              .map((e) => e.slice(0, 1).toUpperCase() + e.slice(1))
              .join("")}
          </div>
        </Link>
      </div>
      <div className="nav-bar">
        <div className="category">Categories</div>
        <Button
          variant="theme"
          onClick={changeTheme}
          title={`Switch between dark and light mode (currently ${theme} mode)`}
        >
          {theme === "light" ? <BsFillSunFill /> : <BsFillMoonFill />}
        </Button>
        <Link to="/sign in">
          <Button variant="flat">Sign In</Button>
        </Link>
        <Link to="/sign out">
          <Button variant="flat">Sign Out</Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
