import React from "react";
import styles from "../../styles/styles.module.scss";
import { CardContent } from "./CardContent";
import { ActiveDetails } from "./ActiveDetails";

type EventCardProps = {
  event: resultsEvent;
  location: EventfulEvent;
  active: boolean;
  toggleActive: () => void;
  savedLocations: SavedLocations[] | null;
};

export const EventCard: React.FC<EventCardProps> = ({ event, location, active, toggleActive, savedLocations }) => {
  const findAddress = (event: resultsEvent, location: EventfulEvent) => {
    return (
      event.entities[0]?.formatted_address ??
      savedLocations?.find((id) => id.location_id === location.location_id)?.formatted_address.slice(0, -8)
    );
  };

  return (
    <div className="category-card" style={{ borderColor: active ? styles.main : "transparent" }}>
      <CardContent
        event={event}
        location={location}
        findAddress={findAddress}
        active={active}
        toggleActive={toggleActive}
      />
      {active && <ActiveDetails event={event} location={location} findAddress={findAddress} />}
    </div>
  );
};
