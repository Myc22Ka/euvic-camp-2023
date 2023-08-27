import React, { useState } from "react";
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

const Details: React.FC = () => {
  const storedContext = localStorage.getItem("lastClickedEvent");
  const [{ event, savedLocations }] = useState<{ event: EventfulEvent; savedLocations: SavedLocations[] }>(
    storedContext ? JSON.parse(storedContext) : null
  );
  const { theme } = useTheme();
  useDocumentTitle(`${event.results[0].title} | Details`);

  // console.log(event);

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
                <CardContentTitle event={event.results[0]} full={true} />
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

      <Stack direction="horizontal" gap={2}>
        <Stack direction="vertical" style={{ flex: 3 }}>
          <div className="category-card no-aminations" style={{ margin: 0, border: "none" }}>
            <Stack className="main-card-content align-items-start" gap={3} direction="vertical">
              <div className="card-title" style={{ fontSize: "small" }}>
                EVENT DETAILS
              </div>
              <ActiveDetails event={event} details={true} />
            </Stack>
          </div>
        </Stack>
        <Stack direction="vertical" style={{ flex: 1, margin: 0 }}>
          <div className="category-card no-aminations" style={{ margin: 0, border: "none" }}>
            Hi
          </div>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default Details;
