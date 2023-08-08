import React from "react";
import { useFetch } from "./hooks/Fetch";
import "./styles/App.scss";

const App: React.FC = () => {
  const { data, loading, error } = useFetch(
    "https://api.predicthq.com/v1/saved-locations/q7r1aSYQ-QjOlmRxJldeNQ/insights/events"
  );
  console.log(data, loading, error);
  return <div className="app">hi</div>;
};
export default App;
