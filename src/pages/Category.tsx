import React, { useRef } from "react";
import { useFetchEvents } from "../hooks/useFetchEvents";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { formatDateTimeRange } from "../utils/dateFormat";
import "../styles/Category.scss";
import Layout from "../layout/Layout";

const Category: React.FC = () => {
  const location = useLocation();
  const category = useRef<string>(decodeURIComponent(location.pathname.substring(1)).split(" ").join("-"));

  const { events, loading, savedLocations } = useFetchEvents({ category: category.current });

  const findAddress = (event: resultsEvent, location: EventfulEvent) => {
    return (
      event.entities[0]?.formatted_address ??
      savedLocations?.find((id) => id.location_id === location.location_id)?.formatted_address.slice(0, -8)
    );
  };

  return (
    <Layout>
      {loading ? <Loader /> : null}
      {events.map((location) =>
        location.results.map((event) => {
          return (
            <Link to={event.id} key={event.id}>
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
                        <span className="predicted-event-spend-number">
                          ${event.predicted_event_spend.toLocaleString()}
                        </span>
                        <span>Predicted Event Spend (USD)</span>
                      </div>
                      <div className="predicted-event-spend">
                        <span className="predicted-event-spend-number black">
                          {event.phq_attendance.toLocaleString()}
                        </span>
                        <span>PHQ Attendance</span>
                      </div>
                      <div className="card-stats-whells">
                        <div className="card-whell">
                          <span className="card-whell-number">{event.rank}</span>
                          <span>PHQ</span>
                        </div>
                        <div className="card-whell">
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
                  <div className="card-button">&#43; more details</div>
                </div>
              </div>
            </Link>
          );
        })
      )}
    </Layout>
  );
};

export default Category;
