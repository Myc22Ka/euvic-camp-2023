import React from "react";
import Layout from "../layout/Layout";
import SliderHome from "../components/SliderHome";
import Categories from "../layout/Categories";
import Section from "../layout/Section";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { Stack } from "react-bootstrap";
import { useEventsContext } from "../context/EventContext";
import MapView from "../components/MapView";

const Home: React.FC = () => {
  const { savedLocations } = useEventsContext();
  useDocumentTitle();

  return (
    <Layout>
      <SliderHome />
      <div className="main">
        <Stack className="category-card mb-0" gap={2}>
          <Stack direction="vertical">
            <span className="card-title fs-4">What are we?</span>
          </Stack>
          <Stack direction="horizontal" className="justify-content-between">
            <div className="description fs-6" style={{ width: "40vw" }}>
              Welcome to our event discovery platform! Explore captivating events in{" "}
              {savedLocations?.map((location) => location.name).join(", ")}, and beyond. Uncover cultural richness and
              excitement both locally and globally. Your journey to unforgettable experiences starts here.
            </div>
            <div className="logo"></div>
          </Stack>
        </Stack>
        <Section>
          <Categories />
        </Section>
        <Stack className="category-card mt-0" gap={2}>
          <Stack direction="vertical">
            <span className="card-title fs-4">Where are we?</span>
            <div className="description fs-6" style={{ width: "40vw" }}>
              You can find us at {savedLocations?.map((location) => location.name).join(", ")}.
            </div>
          </Stack>
          {savedLocations ? (
            <MapView
              center={savedLocations[0]?.places[0].geojson.geometry.coordinates || [21, 52]}
              locations={savedLocations.map((e) => ({
                center: e.places[0].geojson.geometry.coordinates,
                title: e.name,
              }))}
            />
          ) : null}
        </Stack>
      </div>
    </Layout>
  );
};

export default Home;
