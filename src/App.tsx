import React from "react";
import { useFetch } from "./hooks/Fetch";
import "./styles/App.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./auth/SignIn";
import SignOut from "./auth/SignOut";
import Layout from "./layout/Layout";
import { useDocumentTitle } from "./hooks/useDocumentTitle";

const App: React.FC = () => {
  // const { data, loading, error } = useFetch(
  //   "https://api.predicthq.com/v1/saved-locations/q7r1aSYQ-QjOlmRxJldeNQ/insights/events?category=festivals"
  // );
  // console.log(data, loading, error);
  useDocumentTitle();

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":sign in" element={<SignIn />} />
          <Route path=":sign out" element={<SignOut />} />
        </Route>
      </Routes>
    </div>
  );
};
export default App;
