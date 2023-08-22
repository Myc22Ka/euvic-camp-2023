import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { MdOutlineSearch } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

type SearchFilterPropsType = {
  changeEventsDisplay: (newEventsDisplay: EventfulEvent[]) => void;
  events: EventfulEvent[];
};

const SearchFilter: React.FC<SearchFilterPropsType> = ({ changeEventsDisplay, events }) => {
  const [show, setShow] = useState(false);
  const { theme } = useTheme();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant={theme} className="ms-auto" onClick={handleShow}>
        <MdOutlineSearch fontSize={16} /> Search Events
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists,
          etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SearchFilter;
