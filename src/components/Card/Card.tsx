import React from "react";
import { Link } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import { CardContent } from "./CardContent";
import { ActiveDetails } from "./ActiveDetails";
import { useEventsContext } from "../../context/EventContext";

type CardProps = {
  index: number;
};

const Card: React.FC<CardProps> = ({ index }) => {
  const { events } = useEventsContext();

  return (
    <Link to={events[index].results[0].id}>
      <Accordion defaultActiveKey="0">
        <div className="category-card">
          <CardContent index={index} />
          <Accordion.Collapse eventKey={events[index].results[0].id}>
            <ActiveDetails index={index} />
          </Accordion.Collapse>
        </div>
      </Accordion>
    </Link>
  );
};

export default Card;
