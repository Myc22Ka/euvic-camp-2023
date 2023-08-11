import { useEffect, useState } from "react";
import { useSavedLocations } from "./useSavedLocations";

type FetchRequest = {
  category?: string;
};

export const useFetchEvents = ({ category }: FetchRequest) => {
  const { savedLocations } = useSavedLocations();
  const [data, setData] = useState<EventfulEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchLocation = async (location: string) => {
      try {
        const response = await fetch(
          `https://api.predicthq.com/v1/saved-locations/${location}/insights/events?category=${category?.toLocaleLowerCase()}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
              Accept: "application/json",
            },
          }
        );

        const responseData: EventfulEvent = await response.json();
        setData((prev) => {
          const existingEventIds = prev.map((event) => event.results[0].id);
          const exist = responseData.results.find((event) => existingEventIds.includes(event.id));

          if (exist) return [...prev];

          return [...prev, responseData];
        });
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    if (savedLocations) {
      const locationIds = savedLocations.map((location) => location.location_id);

      locationIds.map((location) => {
        fetchLocation(location);
      });
    }
  }, [savedLocations]);

  return { data, error, loading };
};
