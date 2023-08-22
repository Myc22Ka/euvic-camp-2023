import React from "react";
import styles from "../../styles/styles.module.scss";
import { CardContent } from "./CardContent";
import { ActiveDetails } from "./ActiveDetails";
import { Accordion } from "react-bootstrap";

type EventCardProps = {
  event: resultsEvent;
  location: EventfulEvent;
  active: boolean;
  savedLocations: SavedLocations[] | null;
};

export const EventCard: React.FC<EventCardProps> = ({ event, location, active, savedLocations }) => {
  const findAddress = (event: resultsEvent, location: EventfulEvent) => {
    return (
      event.entities[0]?.formatted_address ??
      savedLocations?.find((id) => id.location_id === location.location_id)?.formatted_address
    );
  };

  return (
    <Accordion defaultActiveKey="0">
      <div className="category-card" style={{ borderColor: active ? styles.main : "transparent" }}>
        <CardContent event={event} location={location} findAddress={findAddress} eventKey={event.id} />
        <Accordion.Collapse eventKey={event.id}>
          <ActiveDetails event={event} location={location} findAddress={findAddress} />
        </Accordion.Collapse>
      </div>
    </Accordion>
  );
};
