import React, { useRef } from "react";
import { useFetchEvents } from "../hooks/useFetchEvents";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { formatDateTimeRange } from "../utils/dateFormat";

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

  console.log(events);

  return (
    <div>
      {loading ? <Loader /> : null}
      {events.map((location) =>
        location.results.map((event) => {
          // console.log(event.title, event.entities);
          return (
            <div key={event.id} className="category-card">
              <div className="main">
                <div className="title">
                  {event.title}
                  <span className="event-state"> {event.state}</span>
                </div>
                <div className="formatted-addres">{findAddress(event, location)}</div>
                <div className="time">{formatDateTimeRange(event.start, event.end, event.duration)}</div>
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
              </div>
              <div className="aside">
                <div className="card-stats">
                  <div className="predicted-event-spend">{event.predicted_event_spend}</div>
                  <div className="phq-attendence">{event.phq_attendance}</div>
                </div>
                <div className="card-stats-whells">
                  <div className="card-whell">{event.rank}</div>
                  <div className="card-whell">{event.local_rank}</div>
                </div>
                <div className="card-button">more details</div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Category;
