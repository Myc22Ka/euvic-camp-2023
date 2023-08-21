import React, { useCallback, useState, useRef } from "react";
import { Dropdown } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";
import { ITEMS, sortFromAtoZ } from "../utils/filters";

type FilterPropsType = {
  changeEventsDisplay: (newEventsDisplay: EventfulEvent[]) => void;
  events: EventfulEvent[];
};

const Filter: React.FC<FilterPropsType> = ({ changeEventsDisplay, events }) => {
  const [active, setActive] = useState(0);
  const { theme } = useTheme();

  const handleClick = useCallback(
    (eventKey: any) => {
      setActive(eventKey);
      //   const newEventDisplay = sortFromAtoZ(events);
      //   changeEventsDisplay(newEventDisplay);
      sortFromAtoZ(events);
    },
    [events]
  );

  return (
    <Dropdown className="ms-auto" onSelect={(eventKey) => handleClick(eventKey)}>
      <Dropdown.Toggle variant={theme} id="dropdown-custom-components">{`Sort: ${ITEMS[active].name}`}</Dropdown.Toggle>

      <Dropdown.Menu>
        {ITEMS.map((item, key) => {
          return (
            <Dropdown.Item key={key} eventKey={key}>
              {item.name}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Filter;
