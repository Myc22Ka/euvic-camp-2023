import React from "react";
import { Stack } from "react-bootstrap";

type CardContentTitleProps = {
  event: resultsEvent;
};

export const CardContentTitle: React.FC<CardContentTitleProps> = ({ event }) => {
  return (
    <Stack className="my-2 align-items-center" direction="horizontal" gap={2} style={{ maxWidth: "50vw" }}>
      <span className="card-title" style={{ transition: "color 0.1s ease-in-out" }}>
        {event.title}
      </span>
      {event.state === "active" ? null : (
        <span className="event-state" style={{ whiteSpace: "nowrap" }}>{`${event.state} event`}</span>
      )}
    </Stack>
  );
};
