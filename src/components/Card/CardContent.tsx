import React, { useRef } from "react";
import { CardContentTitle } from "./CardContentTitle";
import { CardStats } from "./CardStats";
import { formatDateTimeRange } from "../../utils/dateFormat";
import CardButton from "./CardButton";
import { useEventsContext } from "../../context/EventContext";
import { findAddress } from "../../constants";

type CardContentProps = {
  index: number;
};

export const CardContent: React.FC<CardContentProps> = ({ index }) => {
  const { savedLocations, events } = useEventsContext();
  const event = useRef(events[index].results[0]).current;

  return (
    <div className="main-card-content vertical">
      <div className="card-flex">
        <div className="card-content">
          <CardContentTitle event={event} />
          <div className="formatted-addres">
            {findAddress(event, events[index], savedLocations) ||
              event.timezone.split("_").join(" ").replace("/", ", ")}
          </div>
          <div className="time">{formatDateTimeRange(event.start, event.end, event.duration)}</div>
        </div>
        <CardStats event={event} />
      </div>
      <div className="card-flex">
        <div className="tags">
          <div className="icon"></div>
          <div className="labels">
            {Array.from(new Set([...event.labels, ...(event.entities[0]?.labels || [])])).map((label, key) => (
              <div key={key} className="label">
                {label}
              </div>
            ))}
          </div>
        </div>
        <CardButton eventKey={event.id} />
      </div>
    </div>
  );
};
