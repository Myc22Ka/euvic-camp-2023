import React, { useRef } from "react";
import { useFetchEvents } from "../hooks/useFetchEvents";
import { useLocation } from "react-router-dom";

const Category: React.FC = () => {
  const location = useLocation();
  const category = useRef<string>(decodeURIComponent(location.pathname.substring(1)));

  const { data } = useFetchEvents({ category: category.current });

  console.log(data);

  return <div>{category.current}</div>;
};

export default Category;
