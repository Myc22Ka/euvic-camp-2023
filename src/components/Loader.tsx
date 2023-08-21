import React from "react";
import { Spinner } from "react-bootstrap";

const Loader: React.FC = () => {
  return (
    <div className="loader-screen">
      <Spinner animation="border" variant="flat" />
    </div>
  );
};

export default Loader;
