import React from "react";
import { Stack } from "react-bootstrap";

type CardContentTitleProps = {
  event: resultsEvent;
  full?: boolean;
};

export const CardContentTitle: React.FC<CardContentTitleProps> = ({ event, full = false }) => {
  return (
    <Stack className="my-2 align-items-center" direction="horizontal" gap={2}>
      <span
        className="card-title"
        style={{
          transition: "color 0.1s ease-in-out",
          // textOverflow: !full ? "ellipsis" : "initial",
          // overflow: !full ? "hidden" : "initial",
          // whiteSpace: "nowrap",
          // maxWidth: !full ? "35vw" : "initial",
          // flex: !full ? 1 : "none",
        }}
      >
        {event.title}
      </span>
      {event.state === "active" ? null : <span className="event-state">{`${event.state} event`}</span>}
    </Stack>
  );
};
