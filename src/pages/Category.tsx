import React from "react";
import { useFetchEvents } from "../hooks/useFetchEvents";
import { useSavedLocations } from "../hooks/useSavedLocations";

const Category: React.FC = () => {
  const { savedLocations } = useSavedLocations();

  savedLocations?.map((location) => console.log(location.name));

  return <div>Category</div>;
};

export default Category;
