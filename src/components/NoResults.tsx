import React from "react";
import { Stack } from "react-bootstrap";
import { FaRegFaceMeh } from "react-icons/fa6";

const NoResults: React.FC = () => {
  return (
    <Stack
      className="position-absolute align-items-center"
      style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      gap={3}
    >
      <FaRegFaceMeh size={75} />
      <h6 className="no-results-title">Sorry, we couldn&apos;t find any results...</h6>
    </Stack>
  );
};

export default NoResults;
