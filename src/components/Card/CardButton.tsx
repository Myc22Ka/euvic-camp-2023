import React, { useState } from "react";
import { useAccordionButton } from "react-bootstrap";

interface CardButtonProps {
  eventKey: string;
}

const CardButton: React.FC<CardButtonProps> = ({ eventKey }) => {
  const [active, setActive] = useState(false);
  const handleClick = useAccordionButton(eventKey, (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setActive(!active);
  });

  return (
    <div className="card-button" onClick={handleClick} style={{ textAlign: "center" }}>
      {!active ? "+ more details" : "- hide details"}
    </div>
  );
};

export default CardButton;
