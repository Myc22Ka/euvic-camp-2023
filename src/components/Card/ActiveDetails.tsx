import React, { useRef } from "react";
import { formatDate } from "../../utils/dateFormat";
import { CardContentDetails } from "./CardContentDetails";
import { useEventsContext } from "../../context/EventContext";
import { findAddress } from "../../constants";

type ActiveDetailsProps = {
  index: number;
};

export const ActiveDetails: React.FC<ActiveDetailsProps> = ({ index }) => {
  const { savedLocations, events } = useEventsContext();
  const event = useRef(events[index].results[0]).current;

  return (
    <React.Fragment>
      <div className="devider"></div>
      <div className="main-card-content">
        <CardContentDetails title="Time & Date">
          <div>
            <div className="time">{formatDate(event.start, "short")}</div>
            <div className="date">{formatDate(event.start, "time")}</div>
          </div>
          <div>&#x2022;</div>
          <div>
            <div className="time">{formatDate(event.end, "short")}</div>
            <div className="date">{formatDate(event.end, "time")}</div>
          </div>
        </CardContentDetails>
        <CardContentDetails title="Venue">
          <div>
            <div className="time">{findAddress(event, events[index], savedLocations)?.split(",")[0]}</div>
            <div className="date">{findAddress(event, events[index], savedLocations)?.split(",")[1]}</div>
          </div>
        </CardContentDetails>
      </div>
      <div className="main-card-content">
        <CardContentDetails title="TimeZone">
          <div>
            <div className="time">{event.timezone}</div>
          </div>
        </CardContentDetails>
      </div>
      {event.description && (
        <div className="main-card-content">
          <CardContentDetails title="Description">
            <div>
              <div className="time">{event.description}</div>
            </div>
          </CardContentDetails>
        </div>
      )}
    </React.Fragment>
  );
};
