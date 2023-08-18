import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/styles.module.scss";
import CardButton from "../components/CardButton";
import { formatDateTimeRange } from "../utils/dateFormat";

type CardProps = {
  event: resultsEvent;
  savedLocations: SavedLocations[] | null;
  location: EventfulEvent;
};

const Card: React.FC<CardProps> = ({ event, savedLocations, location }) => {
  const [active, setActive] = useState(false);

  const findAddress = (event: resultsEvent, location: EventfulEvent) => {
    return (
      event.entities[0]?.formatted_address ??
      savedLocations?.find((id) => id.location_id === location.location_id)?.formatted_address.slice(0, -8)
    );
  };

  const toggleActive = () => {
    setActive(!active); // Toggle the active state
  };

  return (
    <Link to={event.id}>
      <div className="category-card">
        <div className="main-card-content">
          <div className="card-content">
            <div className="card-content-title">
              <span className="card-title">{event.title}</span>
              {event.state === "active" ? null : <span className="event-state">{`${event.state} event`}</span>}
            </div>
            <div className="formatted-addres">{findAddress(event, location)}</div>
            <div className="time">{formatDateTimeRange(event.start, event.end, event.duration)}</div>
          </div>
          <div className="card-content">
            <div className="card-stats">
              <div className="predicted-event-spend">
                <span className="predicted-event-spend-number">${event.predicted_event_spend.toLocaleString()}</span>
                <span>Predicted Event Spend (USD)</span>
              </div>
              <div className="predicted-event-spend">
                <span className="predicted-event-spend-number black">{event.phq_attendance.toLocaleString()}</span>
                <span>PHQ Attendance</span>
              </div>
              <div className="card-stats-whells">
                <div
                  className="card-whell"
                  style={{
                    background: `conic-gradient(${styles.main} ${event.rank * 3.6}deg, ${styles.main}25 ${
                      event.rank * 3.6
                    }deg)`,
                    filter: `hue-rotate(${event.rank * 3.6}deg)`,
                  }}
                >
                  <span className="card-whell-number">{event.rank}</span>
                  <span>PHQ</span>
                </div>
                <div
                  className="card-whell"
                  style={{
                    background: `conic-gradient(${styles.error} ${event.rank * 3.6}deg, ${styles.error}25 ${
                      event.rank * 3.6
                    }deg)`,
                  }}
                >
                  <span className="card-whell-number">{event.local_rank}</span>
                  <span>Local</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-card-content">
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
    </Link>
  );
};

export default Card;
