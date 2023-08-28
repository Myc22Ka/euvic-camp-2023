import React from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, defaultFetchOptions } from "../constants";
import { useEventsContext } from "../context/EventContext";

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
          <div className="category">
            <category.icon />
            <div className="category-title">{category.name}</div>
            <div className="category-description">Some text for now</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
