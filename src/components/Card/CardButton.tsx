import React from "react";

interface CardButtonProps {
  active: boolean;
  toggleActive: () => void;
}

const CardButton: React.FC<CardButtonProps> = ({ active, toggleActive }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    toggleActive();
  };

  return (
    <div className={`card-button ${active ? "active" : ""}`} onClick={handleClick}>
      {active ? "- hide" : "+ more"} details
    </div>
  );
};

export default CardButton;
