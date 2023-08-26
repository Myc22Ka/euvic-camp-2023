import React from "react";
import "./styles/App.scss";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import PageNotFound from "./pages/PageNotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider, initState } from "./context/ThemeContext";
import { EventsProvider } from "./context/EventContext";
import Details from "./pages/Details";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={initState}>
      <EventsProvider>
        <Routes>
          <Route path="/">
            <Route path="*" element={<PageNotFound />} />
            {routes.map((route, key) => {
              if (key === 0) return <Route key={key} index element={<route.component />} />;
              return (
                <Route
                  key={key}
                  index={key === 0}
                  path={key !== 0 ? `/${route.url}` : undefined}
                  element={<route.component />}
                />
              );
            })}
            <Route path={`/category/:id`} element={<Details />} />
          </Route>
        </Routes>
      </EventsProvider>
    </ThemeProvider>
  );
};
export default App;
