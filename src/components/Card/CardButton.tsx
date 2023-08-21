import React from "react";
import { useAccordionButton } from "react-bootstrap";

interface CardButtonProps {
  eventKey: string;
}

const CardButton: React.FC<CardButtonProps> = ({ eventKey }) => {
  const handleClick = useAccordionButton(eventKey, (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
  });

  return (
    <div className={`card-button`} onClick={handleClick}>
      more details
    </div>
  );
};

export default CardButton;
