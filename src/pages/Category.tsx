import React, { useRef, useState, useCallback, useEffect } from "react";
import { useFetchEvents } from "../hooks/useFetchEvents";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import "../styles/Category.scss";
import Layout from "../layout/Layout";
import Card from "../components/Card/Card";
import Section from "../layout/Section";
import { Badge, Stack } from "react-bootstrap";
import SideFilter from "../components/SideFilter";
import SearchFilter from "../components/SearchFilter";
import { defaultFetchOptions } from "../constants";

const Category: React.FC = () => {
  const location = useLocation();
  const category = useRef<string>(decodeURIComponent(location.pathname.substring(1)).split(" ").join("-"));
  const [options, setOptions] = useState<FetchRequest>({ ...defaultFetchOptions, category: category.current });

  const reFetchEvents = useCallback((newOptions: FetchRequest) => {
    setOptions(newOptions);
  }, []);

  const { events, loading, savedLocations, changeEventsDisplay } = useFetchEvents({
    ...defaultFetchOptions,
    ...options,
  });

  return (
    <Layout>
      <Stack direction="horizontal" className="p-2 pb-0" gap={1}>
        <Badge bg="flat" className="rounded-pill">
          {events.reduce((acc, event) => event.results.length + acc, 0)}
        </Badge>
        <div className="badge-text p-2">Events</div>
        <SearchFilter reFetchEvents={reFetchEvents} savedLocations={savedLocations} category={category.current} />
        <SideFilter changeEventsDisplay={changeEventsDisplay} events={events} />
      </Stack>
      {loading ? (
        <Loader />
      ) : (
        <Section>
          {events.map((location) =>
            location.results.map((event) => (
              <Card event={event} savedLocations={savedLocations} key={event.id} location={location} />
            ))
          )}
        </Section>
      )}
    </Layout>
  );
};

export default Category;
