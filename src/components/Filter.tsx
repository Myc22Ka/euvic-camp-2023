import React, { useCallback, useState, useRef } from "react";
import { Dropdown } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";
import { ITEMS, OPTIONS, sortFromAtoZ } from "../utils/filters";

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
      let newEventDisplay: EventfulEvent[] = [];
      eventKey /= 2;
      console.log(eventKey);
      if (Math.floor(eventKey) !== eventKey) {
        newEventDisplay = [...sortFromAtoZ(events, OPTIONS[Math.floor(eventKey)])].reverse();
        changeEventsDisplay(newEventDisplay);
        return;
      }

      newEventDisplay = sortFromAtoZ(events, OPTIONS[eventKey]);
      changeEventsDisplay(newEventDisplay);
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
