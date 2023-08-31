import React from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, defaultFetchOptions } from "../constants";
import { useEventsContext } from "../context/EventContext";
import { Stack } from "react-bootstrap";

const Categories: React.FC = () => {
  const { reFetchEvents } = useEventsContext();

  return (
    <div className="categories">
      {CATEGORIES.map((category, key) => (
        <Link
          key={key}
          to="category"
          onClick={() =>
            reFetchEvents({ ...defaultFetchOptions, category: category.name.toLowerCase().split(" ").join("-") })
          }
        >
          <Stack
            direction="vertical"
            gap={2}
            className="justify-content-center align-items-center category"
            title={category.details}
          >
            <category.icon />
            <div className="category-title">{category.name}</div>
          </Stack>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
