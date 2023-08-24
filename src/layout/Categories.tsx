import React from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../constants";

const Categories: React.FC = () => {
  return (
    <div className="categories">
      {CATEGORIES.map((category, key) => (
        <Link key={key} to="category">
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
