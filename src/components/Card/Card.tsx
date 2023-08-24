import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EventCard } from "./EventCard";

type CardProps = {
  event: resultsEvent;
  savedLocations: SavedLocations[] | null;
  location: EventfulEvent;
};

const Card: React.FC<CardProps> = ({ event, savedLocations, location }) => {
  return (
    <Link to={event.id}>
      <EventCard event={event} location={location} savedLocations={savedLocations} />
    </Link>
  );
};

export default Card;
