import React from "react";
import Layout from "../layout/Layout";
import SliderHome from "../components/SliderHome";
import Categories from "../layout/Categories";
import Section from "../layout/Section";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { Stack } from "react-bootstrap";

const Home: React.FC = () => {
  useDocumentTitle();

  return (
    <Layout>
      <SliderHome />
      <div className="main">
        <Section>
          <Categories />
        </Section>
        <Stack className="category-card" gap={2} style={{ boxShadow: "none", margin: 0 }}>
          Hi
        </Stack>
      </div>
    </Layout>
  );
};

export default Home;
