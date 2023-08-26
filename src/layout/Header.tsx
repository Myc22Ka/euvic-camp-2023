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
    <div className={`${home ? "home header" : "header"} ${theme}-mode gap-5`}>
      <Link to="/" className="d-flex justify-content-center pr-5">
        <div className="logo-img"></div>
        <div className="app-name align-self-center">
          {process.env.REACT_APP_NAME?.split("-")
            .map((e) => e.slice(0, 1).toUpperCase() + e.slice(1))
            .join("")}
        </div>
      </Link>
      <div className="nav-bar d-flex justify-content-start gap-2 p-2" style={{ flex: 1 }}>
        <Link to="/" className="link p-2" style={{ fontWeight: "bold" }}>
          <Button variant="href" className="ms-auto p-2 align-self-center">
            Home
          </Button>
        </Link>
        <Link to="/category" className="link p-2" style={{ fontWeight: "bold" }}>
          <Button variant="href" className="ms-auto p-2 align-self-center">
            Events
          </Button>
        </Link>
        <Button
          variant="theme"
          onClick={changeTheme}
          title={`Switch between dark and light mode (currently ${theme} mode)`}
          className="ms-auto p-2 align-self-center"
        >
          {theme === "light" ? <BsFillSunFill /> : <BsFillMoonFill />}
        </Button>
        <Link to="/sign in" className="align-items-center d-flex">
          <Button variant="flat">Sign In</Button>
        </Link>
        <Link to="/sign out" className="align-items-center d-flex">
          <Button variant="flat">Sign Out</Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
