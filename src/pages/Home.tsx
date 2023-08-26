import React from "react";
import Layout from "../layout/Layout";
import SliderHome from "../components/SliderHome";
import Categories from "../layout/Categories";
import Section from "../layout/Section";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const Home: React.FC = () => {
  useDocumentTitle();

  return (
    <Layout>
      <SliderHome />
      <div className="main">
        <Section>
          <Categories />
        </Section>
      </div>
    </Layout>
  );
};

export default Home;
