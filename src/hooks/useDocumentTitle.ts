import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useDocumentTitle = (url: string = "") => {
  const location = useLocation();

  useEffect(() => {
    if (url) {
      document.title = url;
      return;
    }

    const setTitle = () => {
      const path = location.pathname.substring(1);
      if (!path) return "Home";

      const pathArray = path.split("/").map((segment) => decodeURIComponent(segment));

      return pathArray[pathArray.length - 1]
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    document.title = setTitle();
  }, [location, url]);
};
