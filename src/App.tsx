import React from "react";
import "./styles/App.scss";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider, ThemeType, initState } from "./context/ThemeContext";
import { EventsProvider } from "./context/EventContext";
import Details from "./pages/Details";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={(localStorage.getItem("theme") as ThemeType) || initState}>
      <EventsProvider>
        <Routes>
          <Route path="/">
            <Route path="*" element={<Home />} /> {/*here should be page not foung but i'm to lazy */}
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
