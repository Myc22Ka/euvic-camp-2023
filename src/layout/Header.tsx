import React from "react";
import { Link } from "react-router-dom";
import { Button, Nav, Navbar, Stack } from "react-bootstrap";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { useTheme } from "../context/ThemeContext";

type HeaderProps = {
  home: boolean;
};

const Header: React.FC<HeaderProps> = ({ home }) => {
  const { theme, changeTheme } = useTheme();

  return (
    <Navbar expand="lg" className={`${home ? "home header" : "header"} ${theme}-mode px-2`}>
      <Link to="/" className="d-flex justify-content-center pr-5">
        <div className="logo-img"></div>
        <div className="app-name align-self-center">
          {process.env.REACT_APP_NAME?.split("-")
            .map((e) => e.slice(0, 1).toUpperCase() + e.slice(1))
            .join("")}
        </div>
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Link to="/" className="link p-2" style={{ fontWeight: "bold" }}>
            <Button variant="href" className="p-2 align-self-center">
              Home
            </Button>
          </Link>
          <Link to="/category" className="link p-2" style={{ fontWeight: "bold" }}>
            <Button variant="href" className="p-2 align-self-center">
              Events
            </Button>
          </Link>
          <Stack direction="horizontal">
            <Button
              variant="theme"
              onClick={changeTheme}
              title={`Switch between dark and light mode (currently ${theme} mode)`}
              className="p-2 align-self-center ms-auto"
            >
              {theme === "light" ? <BsFillSunFill /> : <BsFillMoonFill />}
            </Button>
            <Link to="/login" className="align-items-center d-flex">
              <Button variant="flat">Login</Button>
            </Link>
            <Link to="/sign up" className="align-items-center d-flex">
              <Button variant="flat">Sign Up</Button>
            </Link>
          </Stack>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

// <Navbar expand="lg" className={`${home ? "home header" : "header"} ${theme}-mode gap-5`}>
//   <Container>
//     <Navbar.Toggle aria-controls="basic-navbar-nav" />
//     <Link to="/" className="d-flex justify-content-center pr-5">
//       <div className="logo-img"></div>
//       <div className="app-name align-self-center">
//         {process.env.REACT_APP_NAME?.split("-")
//           .map((e) => e.slice(0, 1).toUpperCase() + e.slice(1))
//           .join("")}
//       </div>
//     </Link>
//     <div className="nav-bar d-flex justify-content-start gap-2 p-2" style={{ flex: 1 }}>
//       <Link to="/" className="link p-2" style={{ fontWeight: "bold" }}>
//         <Button variant="href" className="ms-auto p-2 align-self-center">
//           Home
//         </Button>
//       </Link>
//       <Link to="/category" className="link p-2" style={{ fontWeight: "bold" }}>
//         <Button variant="href" className="ms-auto p-2 align-self-center">
//           Events
//         </Button>
//       </Link>
// <Button
//   variant="theme"
//   onClick={changeTheme}
//   title={`Switch between dark and light mode (currently ${theme} mode)`}
//   className="ms-auto p-2 align-self-center"
// >
//   {theme === "light" ? <BsFillSunFill /> : <BsFillMoonFill />}
// </Button>
// <Link to="/sign in" className="align-items-center d-flex">
//   <Button variant="flat">Sign In</Button>
// </Link>
// <Link to="/sign out" className="align-items-center d-flex">
//   <Button variant="flat">Sign Out</Button>
// </Link>
//     </div>
//   </Container>
// </Navbar>
