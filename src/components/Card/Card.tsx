import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EventCard } from "./EventCard";

type CardProps = {
  event: resultsEvent;
  savedLocations: SavedLocations[] | null;
  location: EventfulEvent;
};

const Card: React.FC<CardProps> = ({ event, savedLocations, location }) => {
  const [active, setActive] = useState(false);

  const toggleActive = () => {
    setActive(!active); // Toggle the active state
  };

  return (
    <Link to={event.id}>
      <EventCard event={event} location={location} active={active} savedLocations={savedLocations} />
    </Link>
  );
};

export default Card;
