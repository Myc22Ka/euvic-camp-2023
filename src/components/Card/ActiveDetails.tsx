import React from "react";
import { formatDate } from "../../utils/dateFormat";
import { CardContentDetails } from "./CardContentDetails";

type ActiveDetailsProps = {
  event: resultsEvent;
  location: EventfulEvent;
  findAddress: (event: resultsEvent, location: EventfulEvent) => string;
};

export const ActiveDetails: React.FC<ActiveDetailsProps> = ({ event, location, findAddress }) => {
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
            <div className="time">{findAddress(event, location).split(",")[0]}</div>
            <div className="date">{findAddress(event, location).split(",")[1]}</div>
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
