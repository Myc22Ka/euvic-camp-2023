import React from "react";
import Loader from "../components/Loader";
import "../styles/Category.scss";
import Layout from "../layout/Layout";
import Card from "../components/Card/Card";
import Section from "../layout/Section";
import { Badge, Stack } from "react-bootstrap";
import SideFilter from "../components/SideFilter";
import SearchFilter from "../components/SearchFilter";
import NoResults from "../components/NoResults";
import { useEventsContext } from "../context/EventContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { generateRequest } from "../constants";

const Category: React.FC = () => {
  const { events, loading, options } = useEventsContext();
  useDocumentTitle();

  return (
    <Layout>
      <Stack direction="horizontal" className="p-2 pb-0" gap={1}>
        <Badge bg="flat" className="rounded-pill">
          {events.reduce((acc, event) => event.results.length + acc, 0)}
        </Badge>
        <div className="badge-text p-2">Events</div>
        <SearchFilter />
        <SideFilter />
      </Stack>
      {loading ? (
        <Loader />
      ) : generateRequest(options).length > 1 && events.length === 0 ? (
        <NoResults />
      ) : (
        <Section>
          {events.map((event, index) => (
            <Card key={event.results[0].id} index={index} />
          ))}
        </Section>
      )}
    </Layout>
  );
};

export default Category;
