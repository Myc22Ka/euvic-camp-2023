import React, { useRef } from "react";
import { useFetchEvents } from "../hooks/useFetchEvents";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";

const Category: React.FC = () => {
  const location = useLocation();
  const category = useRef<string>(decodeURIComponent(location.pathname.substring(1)).split(" ").join("-"));

  const { events, loading } = useFetchEvents({ category: category.current });

  return (
    <div>
      {loading ? <Loader /> : null}
      {events.map((location) =>
        location.results.map((event) => {
          return (
            <div key={event.id} className="title">
              {event.title}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Category;
