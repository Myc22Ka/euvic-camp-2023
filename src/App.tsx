import React from "react";
import "./styles/App.scss";
import { Route, Routes } from "react-router-dom";
import { useDocumentTitle } from "./hooks/useDocumentTitle";
import { routes } from "./routes";
import PageNotFound from "./pages/PageNotFound";

const App: React.FC = () => {
  useDocumentTitle();

  return (
    <div className="app">
      <Routes>
        <Route path="/">
          <Route path="*" element={<PageNotFound />} />
          {routes.map((route, key) => (
            <Route
              key={key}
              index={key === 0}
              path={key !== 0 ? `:${route.url}` : undefined}
              element={<route.component />}
            />
          ))}
        </Route>
      </Routes>
    </div>
  );
};
export default App;
