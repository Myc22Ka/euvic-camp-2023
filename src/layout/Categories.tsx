import React from "react";
import { motion } from "framer-motion";
import { BUTTON_ANIMATION } from "../constants";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../constants";

const Categories: React.FC = () => {
  return (
    <div className="categories">
      {CATEGORIES.map((category, key) => (
        <Link key={key} to={category.name}>
          <motion.div className="category" {...BUTTON_ANIMATION}>
            <category.icon />
            <div className="category-title">{category.name}</div>
            <div className="category-description">Some text for now</div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
