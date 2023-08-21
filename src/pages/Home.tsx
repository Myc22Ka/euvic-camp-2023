import React from "react";
import Layout from "../layout/Layout";
import SliderHome from "../components/SliderHome";
import Categories from "../layout/Categories";
import Section from "../layout/Section";

const Home: React.FC = () => {
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
