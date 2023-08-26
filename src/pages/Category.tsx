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

const Category: React.FC = () => {
  const { events, loading } = useEventsContext();
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
      ) : events.length !== 0 ? (
        <Section>
          {events.map((event, index) => (
            <Card key={event.results[0].id} index={index} />
          ))}
        </Section>
      ) : (
        <NoResults />
      )}
    </Layout>
  );
};

export default Category;
