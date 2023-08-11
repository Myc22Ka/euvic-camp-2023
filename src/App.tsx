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
          {routes.map((route, key) => {
            if (key === 0) return <Route key={key} index element={<route.component />} />;
            if (Array.isArray(route.url))
              return route.url.map((e, i) => (
                <Route key={`${key}-${i}`} path={`:${e}`} element={<route.component />} />
              ));
            return <Route key={key} path={`:${route.url}`} element={<route.component />} />;
          })}
        </Route>
      </Routes>
    </div>
  );
};
export default App;
