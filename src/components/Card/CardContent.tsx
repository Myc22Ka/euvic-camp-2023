import React from "react";
import { CardContentTitle } from "./CardContentTitle";
import { CardStats } from "./CardStats";
import { formatDateTimeRange } from "../../utils/dateFormat";
import CardButton from "./CardButton";

type CardContentProps = {
  event: resultsEvent;
  location: EventfulEvent;
  active: boolean;
  toggleActive: () => void;
  findAddress: (event: resultsEvent, location: EventfulEvent) => string;
};

export const CardContent: React.FC<CardContentProps> = ({ event, location, active, toggleActive, findAddress }) => {
  return (
    <div className="main-card-content vertical">
      <div className="card-flex">
        <div className="card-content">
          <CardContentTitle event={event} />
          <div className="formatted-addres">{findAddress(event, location)}</div>
          <div className="time">{formatDateTimeRange(event.start, event.end, event.duration)}</div>
        </div>
        <CardStats event={event} />
      </div>
      <div className="card-flex">
        <div className="tags">
          <div className="icon"></div>
          <div className="labels">
            {event.labels.map((label, key) => (
              <div key={key} className="label">
                {label}
              </div>
            ))}
          </div>
        </div>
        <CardButton active={active} toggleActive={toggleActive} />
      </div>
    </div>
  );
};
