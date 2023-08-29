import React, { useMemo, useState } from "react";
import Layout from "../layout/Layout";
import { Button, Stack } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { findAddress } from "../constants";
import { CardContentTitle } from "../components/Card/CardContentTitle";
import { CardStats } from "../components/Card/CardStats";
import Labels from "../components/Card/Labels";
import Section from "../layout/Section";
import { ActiveDetails } from "../components/Card/ActiveDetails";
import Calendar from "../components/CalendarModule";
import MapView from "../components/MapView";

const Details: React.FC = () => {
  const storedContext = localStorage.getItem("lastClickedEvent");
  const [{ event, savedLocations }] = useState<{ event: EventfulEvent; savedLocations: SavedLocations[] }>(
    storedContext ? JSON.parse(storedContext) : null
  );
  const { theme } = useTheme();
  useDocumentTitle(`${event.results[0].title} | Details`);

  const defaultObj = useMemo(() => {
    return {
      accommodation: 0,
      hospitality: 0,
      transportation: 0,
    };
  }, []);

  return (
    <Layout>
      <Stack direction="horizontal" gap={3} className="p-2 pb-0">
        <Link to="/category">
          <Button variant={theme} className="gap-2 d-flex justify-content-center align-items-center" size="lg">
            <MdArrowBack size={18} />
            Search
          </Button>
        </Link>
      </Stack>

      <Section>
        <div className="category-card no-aminations" style={{ margin: 0, border: "none" }}>
          <Stack className="main-card-content" gap={3}>
            <Stack direction="horizontal" gap={4} className="justify-content-between wrap-920">
              <Stack className="card-content">
                <CardContentTitle event={event.results[0]} />
                <div className="formatted-addres" style={{ opacity: 0.7 }}>
                  {findAddress(event.results[0], event, savedLocations) ||
                    event.results[0].timezone?.split("_").join(" ").replace("/", ", ")}
                </div>
              </Stack>
            </Stack>
            <Stack direction="horizontal" className="justify-content-between">
              <Labels event={event.results[0]} />
              <CardStats event={event.results[0]} noMoney={true} />
            </Stack>
          </Stack>
        </div>
      </Section>

      <Stack direction="horizontal" gap={2} style={{ flexWrap: "wrap" }}>
        <Stack direction="vertical" style={{ flex: 5 }}>
          <div className="category-card no-aminations" style={{ margin: 0, border: "none" }}>
            <Stack className="main-card-content align-items-start" gap={3} direction="vertical">
              <div className="card-title" style={{ fontSize: "small" }}>
                EVENT DETAILS
              </div>
              <ActiveDetails event={event} details={true} />
            </Stack>
          </div>
          <div className="category-card no-aminations" style={{ border: "none" }}>
            <Stack className="main-card-content align-items-start pb-4" gap={1} direction="vertical">
              <div className="card-title pb-4" style={{ fontSize: "large" }}>
                LOCATION
              </div>
              <Stack direction="horizontal" className="justify-content-between">
                <Stack direction="vertical">
                  <div className="formatted-addres" style={{ fontSize: "small", opacity: 0.9 }}>
                    {findAddress(event.results[0], event, savedLocations) ||
                      event.results[0].timezone?.split("_").join(" ").replace("/", ", ")}
                  </div>
                  <div style={{ fontSize: "small", opacity: 0.6 }}>{event.results[0].location.join(", ")}</div>
                </Stack>
                <a
                  href={`https://www.google.com/maps?q=${[
                    event.results[0].location[1],
                    event.results[0].location[0],
                  ].join(",")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant={`${theme}-bright`}>
                    <Stack gap={2} direction="horizontal">
                      <span>Go to Location</span>
                      <MdArrowBack size={18} style={{ transform: "rotate(180deg)" }} />
                    </Stack>
                  </Button>
                </a>
              </Stack>
            </Stack>
            <MapView center={event.results[0].location} title={event.results[0].title} />
          </div>
        </Stack>
        <Stack direction="vertical" style={{ flex: 2, margin: 0 }}>
          <div className="category-card no-aminations" style={{ margin: 0, border: "none" }}>
            <Stack className="main-card-content align-items-start" gap={3} direction="vertical">
              <div className="card-title" style={{ fontSize: "small" }}>
                PREDICTED EVENT SPEND
              </div>
              <Stack className="card-content align-items-start">
                <div className="card-stats">
                  <div className="predicted-event-spend">
                    <span className="predicted-event-spend-number" style={{ fontSize: "large" }}>
                      ${event.results[0]?.predicted_event_spend?.toLocaleString() || 0}
                    </span>
                    <span>Total Predicted Event Spend (USD)</span>
                  </div>
                </div>
                <Stack
                  direction="horizontal"
                  gap={2}
                  className="justify-content-between pt-4"
                  style={{ opacity: 0.6, fontSize: "small" }}
                >
                  <div>SPEND CATEGORIES</div>
                  <div>SPEND (USD)</div>
                </Stack>
                {Object.entries(event.results[0]?.predicted_event_spend_industries || defaultObj).map(
                  ([key, value]) => {
                    return (
                      <React.Fragment key={key}>
                        <div className="devider"></div>
                        <Stack
                          direction="horizontal"
                          gap={2}
                          className="justify-content-between pt-2"
                          style={{ fontSize: "small" }}
                        >
                          <div style={{ textTransform: "capitalize" }}>{key}</div>
                          <div>${value.toLocaleString()}</div>
                        </Stack>
                      </React.Fragment>
                    );
                  }
                )}
              </Stack>
            </Stack>
          </div>
          <div className="category-card no-aminations" style={{ border: "none" }}>
            <Calendar from={event.results[0].start} to={event.results[0].end} />
          </div>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default Details;
