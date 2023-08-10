import React from "react";
import {
  MdSportsBaseball,
  MdOutlineFestival,
  MdOutlineMusicNote,
  MdPeople,
  MdSchool,
  MdSlideshow,
  MdBrush,
  MdShoppingCart,
} from "react-icons/md";
import { IconType } from "react-icons/lib";
import { motion } from "framer-motion";

const CATEGORIES: Array<{ name: string; component: IconType }> = [
  { name: "Sports", component: MdSportsBaseball },
  { name: "Conferences", component: MdSlideshow },
  { name: "Expos", component: MdShoppingCart },
  { name: "Concerts", component: MdOutlineMusicNote },
  { name: "Festivals", component: MdOutlineFestival },
  { name: "Performing Arts", component: MdBrush },
  { name: "Community", component: MdPeople },
  { name: "Academic", component: MdSchool },
];

const Categories: React.FC = () => {
  const btnAnimation = {
    duration: 0.4,
    type: "spring",
    ease: "anticipate",
  };

  return (
    <div className="categories">
      {CATEGORIES.map((category, key) => (
        <motion.div
          className="category"
          key={key}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={btnAnimation}
        >
          <category.component />
          <div className="category-title">{category.name}</div>
          <div className="category-description">Some text for now</div>
        </motion.div>
      ))}
    </div>
  );
};

export default Categories;
