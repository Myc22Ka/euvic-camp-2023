import React, { useRef } from "react";
import { useFetchEvents } from "../hooks/useFetchEvents";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import "../styles/Category.scss";
import Layout from "../layout/Layout";
import Card from "../components/Card/Card";
import Section from "../layout/Section";
import { Badge, Stack } from "react-bootstrap";
import Filter from "../components/Filter";

const Category: React.FC = () => {
  const location = useLocation();
  const category = useRef<string>(decodeURIComponent(location.pathname.substring(1)).split(" ").join("-"));

  const { events, loading, savedLocations, changeEventsDisplay } = useFetchEvents({ category: category.current });

  return (
    <Layout>
      {loading ? <Loader /> : null}
      <Stack direction="horizontal" className="p-2 pb-0">
        <Badge bg="flat" className="rounded-pill">
          {events.reduce((acc, event) => event.results.length + acc, 0)}
        </Badge>
        <div className="badge-text p-2">Events</div>
        <Filter changeEventsDisplay={changeEventsDisplay} events={events} />
      </Stack>
      <Section>
        {events.map((location) =>
          location.results.map((event) => (
            <Card event={event} savedLocations={savedLocations} key={event.id} location={location} />
          ))
        )}
      </Section>
    </Layout>
  );
};

export default Category;
