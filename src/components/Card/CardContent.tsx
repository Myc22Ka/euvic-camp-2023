import React, { useRef } from "react";
import { CardContentTitle } from "./CardContentTitle";
import { CardStats } from "./CardStats";
import { formatDateTimeRange } from "../../utils/dateFormat";
import CardButton from "./CardButton";
import { useEventsContext } from "../../context/EventContext";
import { findAddress } from "../../constants";
import { Stack } from "react-bootstrap";
import Labels from "./Labels";

type CardContentProps = {
  index: number;
};

export const CardContent: React.FC<CardContentProps> = ({ index }) => {
  const { savedLocations, events } = useEventsContext();
  const event = useRef(events[index].results[0]).current;

  return (
    <Stack className="main-card-content" gap={2}>
      <Stack direction="horizontal" gap={4} className="justify-content-between wrap-920">
        <Stack className="card-content">
          <CardContentTitle event={event} />
          <div className="formatted-addres">
            {findAddress(event, events[index], savedLocations) ||
              event.timezone?.split("_").join(" ").replace("/", ", ")}
          </div>
          <div className="time">{formatDateTimeRange(event.start, event.end, event.duration)}</div>
        </Stack>
        <CardStats event={event} />
      </Stack>
      <Stack direction="horizontal" className="justify-content-between">
        <Labels event={event} />
        <CardButton eventKey={event.id} />
      </Stack>
    </Stack>
  );
};
