import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Button, Stack } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { findAddress } from "../constants";

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
      <Stack direction="horizontal" gap={3} className="py-2 px-4">
        <Link to="/category">
          <Button variant={theme} className="gap-2 d-flex justify-content-center align-items-center" size="lg">
            <MdArrowBack size={18} />
            Search
          </Button>
        </Link>
      </Stack>
      <Stack direction="horizontal" gap={3} className="py-2 px-4">
        <Stack>
          <h1>{event.results[0].title}</h1>
          <div className="formatted-address">
            {findAddress(event.results[0], event, savedLocations) ||
              event.results[0].timezone?.split("_").join(" ").replace("/", ", ")}
          </div>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default Details;
