import React from "react";
import Layout from "../layout/Layout";
import Slider from "../components/Slider";
import Categories from "../layout/Categories";
import Main from "../layout/Main";

const Home: React.FC = () => {
  return (
    <Layout>
      <Slider />
      <Main>
        <Categories />
      </Main>
    </Layout>
  );
};

export default Home;
