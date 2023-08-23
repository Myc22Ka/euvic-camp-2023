import { useEffect, useState, useCallback } from "react";
import { useSavedLocations } from "./useSavedLocations";

export const useFetchEvents = ({ category, limit }: FetchRequest) => {
  const { savedLocations } = useSavedLocations();
  const [events, setEvents] = useState<EventfulEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);

  const changeEventsDisplay = useCallback((newEventsDisplay: EventfulEvent[]) => {
    setEvents(newEventsDisplay);
  }, []);

  useEffect(() => {
    setLoading(true);
    const tempEventsArray: EventfulEvent[] = [];

    const fetchLocation = async (location: string) => {
      try {
        const response = await fetch(
          `https://api.predicthq.com/v1/saved-locations/${location}/insights/events?category=${category?.toLocaleLowerCase()}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
              Accept: "application/json",
            },
          }
        );

        const data = await response.json();
        tempEventsArray.push({ ...data, location_id: location });
      } catch (err) {
        setErr("An error occurred while fetching data.");
      }
    };

    if (!savedLocations) {
      setErr("An error occurred while fetching saved locations.");
    } else {
      Promise.all(savedLocations.map((location) => fetchLocation(location.location_id)))
        .then(() => {
          setEvents(tempEventsArray);
        })
        .catch(() => {
          setErr("An error occurred while fetching data.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [savedLocations, category, limit]);

  return { events, err, loading, savedLocations, changeEventsDisplay };
};
