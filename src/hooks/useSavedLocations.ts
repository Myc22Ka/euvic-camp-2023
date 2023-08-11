import { useEffect, useState } from "react";
import { SavedLocations } from "../types/types";

export const useSavedLocations = () => {
  const [savedLocations, setSavedLocations] = useState<SavedLocations[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const getSavedLocations = async () => {
      try {
        const response = await fetch("https://api.predicthq.com/v1/saved-locations", {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            Accept: "application/json",
          },
        });

        const responseData = await response.json();
        setSavedLocations(responseData.locations);
      } catch (err) {
        setError("An error occurred while fetching saved locations.");
      } finally {
        setLoading(false);
      }
    };

    getSavedLocations();
  }, []);

  return { loading, error, savedLocations };
};
