import React, { useRef } from "react";
import { useFetchEvents } from "../hooks/useFetchEvents";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import "../styles/Category.scss";
import Layout from "../layout/Layout";
import Card from "../components/Card";

const Category: React.FC = () => {
  const location = useLocation();
  const category = useRef<string>(decodeURIComponent(location.pathname.substring(1)).split(" ").join("-"));

  const { events, loading, savedLocations } = useFetchEvents({ category: category.current });

  return (
    <Layout>
      {loading ? <Loader /> : null}
      {events.map((location) =>
        location.results.map((event) => (
          <Card event={event} savedLocations={savedLocations} key={event.id} location={location} />
        ))
      )}
    </Layout>
  );
};

export default Category;
