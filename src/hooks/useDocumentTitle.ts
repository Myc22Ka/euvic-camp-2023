import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useDocumentTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const setTitle = (): string => {
      const path = location.pathname.substring(1);
      if (!path) {
        return "Home";
      }
      const pathArray = path.split("/").map((segment) => decodeURIComponent(segment));

      return pathArray[pathArray.length - 1]
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    document.title = `${process.env.REACT_APP_NAME} | ${setTitle()}`;
  }, [location]);
};
