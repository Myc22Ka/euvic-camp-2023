import React from "react";
import { formatDate } from "../../utils/dateFormat";
import { CardContentDetails } from "./CardContentDetails";
import { useEventsContext } from "../../context/EventContext";
import { findAddress } from "../../constants";
import { Stack } from "react-bootstrap";

type ActiveDetailsProps = {
  event: EventfulEvent;
  details?: boolean;
};

const TimeAndDateContent: React.FC<{ event: EventfulEvent }> = ({ event }) => (
  <CardContentDetails title="Time & Date">
    <div>
      <div className="time">{formatDate(event.results[0].start, "short")}</div>
      <div className="date">{formatDate(event.results[0].start, "time")}</div>
    </div>
    <div>&#x2022;</div>
    <div>
      <div className="time">{formatDate(event.results[0].end, "short")}</div>
      <div className="date">{formatDate(event.results[0].end, "time")}</div>
    </div>
  </CardContentDetails>
);

const VenueContent: React.FC<{ event: EventfulEvent; savedLocations: SavedLocations[] | null }> = ({
  event,
  savedLocations,
}) => (
  <CardContentDetails title="Venue">
    <div>
      <div className="time">{findAddress(event.results[0], event, savedLocations)?.split(",")[0]}</div>
      <div className="date">{findAddress(event.results[0], event, savedLocations)?.split(",")[1]}</div>
    </div>
  </CardContentDetails>
);

export const ActiveDetails: React.FC<ActiveDetailsProps> = ({ event, details = false }) => {
  const { savedLocations } = useEventsContext();

  return (
    <React.Fragment>
      {!details ? (
        <React.Fragment>
          <div className="devider"></div>
          <Stack className="main-card-content" direction="horizontal">
            <TimeAndDateContent event={event} />
            <VenueContent event={event} savedLocations={savedLocations} />
          </Stack>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Stack className="main-card-content">
            <TimeAndDateContent event={event} />
          </Stack>
          <Stack className="main-card-content">
            <VenueContent event={event} savedLocations={savedLocations} />
          </Stack>
        </React.Fragment>
      )}
      <Stack className="main-card-content">
        <CardContentDetails title="TimeZone">
          <div>
            <div className="time">{event.results[0].timezone}</div>
          </div>
        </CardContentDetails>
      </Stack>
      {event.results[0].description && (
        <Stack className="main-card-content">
          <CardContentDetails title="Description">
            <div>
              <div className="time">{event.results[0].description}</div>
            </div>
          </CardContentDetails>
        </Stack>
      )}
    </React.Fragment>
  );
};
