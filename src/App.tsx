import React from "react";
import "./styles/App.scss";
import { Route, Routes } from "react-router-dom";
import { useDocumentTitle } from "./hooks/useDocumentTitle";
import { routes } from "./routes";
import PageNotFound from "./pages/PageNotFound";
import Category from "./pages/Category";
import { CATEGORIES } from "./constants";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider, initState } from "./context/ThemeContext";

const App: React.FC = () => {
  useDocumentTitle();

  return (
    <ThemeProvider theme={initState}>
      <Routes>
        <Route path="/">
          <Route path="*" element={<PageNotFound />} />
          {routes.map((route, key) => {
            if (key === 0) return <Route key={key} index element={<route.component />} />;
            return (
              <Route
                key={key}
                index={key === 0}
                path={key !== 0 ? `:${route.url}` : undefined}
                element={<route.component />}
              />
            );
          })}
          {CATEGORIES.map((category, key) => (
            <Route key={key} path={`:${category.name}`} element={<Category />} />
          ))}
        </Route>
      </Routes>
    </ThemeProvider>
  );
};
export default App;
