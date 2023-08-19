import React from "react";

type CardContentTitleProps = {
  event: resultsEvent;
};

export const CardContentTitle: React.FC<CardContentTitleProps> = ({ event }) => {
  return (
    <div className="card-content-title">
      <span className="card-title">{event.title}</span>
      {event.state === "active" ? null : <span className="event-state">{`${event.state} event`}</span>}
    </div>
  );
};
