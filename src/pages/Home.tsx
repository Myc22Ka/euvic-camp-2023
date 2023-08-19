import React from "react";
import Layout from "../layout/Layout";
import SliderHome from "../components/SliderHome";
import Categories from "../layout/Categories";
import Main from "../layout/Main";

const Home: React.FC = () => {
  return (
    <Layout>
      <SliderHome />
      <Main>
        <Categories />
      </Main>
    </Layout>
  );
};

export default Home;
