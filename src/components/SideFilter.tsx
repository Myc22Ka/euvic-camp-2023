import React, { useCallback, useState, useRef } from "react";
import { Dropdown } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";
import { ITEMS, OPTIONS, filterEvents } from "../utils/filters";

type FilterPropsType = {
  changeEventsDisplay: (newEventsDisplay: EventfulEvent[]) => void;
  events: EventfulEvent[];
};

const SideFilter: React.FC<FilterPropsType> = ({ changeEventsDisplay, events }) => {
  const [active, setActive] = useState(0);
  const { theme } = useTheme();

  const handleClick = useCallback(
    (eventKey: any) => {
      setActive(eventKey);
      let newEventDisplay: EventfulEvent[] = [];
      eventKey /= 2;
      if (Math.floor(eventKey) !== eventKey) {
        newEventDisplay = [...filterEvents(events, OPTIONS[Math.floor(eventKey)])].reverse();
        changeEventsDisplay(newEventDisplay);
        return;
      }

      newEventDisplay = filterEvents(events, OPTIONS[eventKey]);
      changeEventsDisplay(newEventDisplay);
    },
    [events]
  );

  return (
    <Dropdown onSelect={(eventKey) => handleClick(eventKey)}>
      <Dropdown.Toggle variant={theme} id="dropdown-custom-components">{`Sort: ${ITEMS[active].name}`}</Dropdown.Toggle>

      <Dropdown.Menu variant={theme}>
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

export default SideFilter;
