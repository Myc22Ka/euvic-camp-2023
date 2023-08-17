import { useEffect, useState } from "react";
import { useSavedLocations } from "./useSavedLocations";

type FetchRequest = {
  category?: string;
};

export const useFetchEvents = ({ category }: FetchRequest) => {
  const { savedLocations } = useSavedLocations();
  const [events, setEvents] = useState<EventfulEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const tempEventsArray: EventfulEvent[] = [];
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

        await response.json().then((data) => {
          tempEventsArray.push({ ...data, location_id: location });
        });

        setEvents(events);
      } catch (err) {
        setErr("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    if (!savedLocations) return setErr("An error occurred while fetching saved locations.");

    const locationIds = savedLocations.map((location) => location.location_id);
    locationIds.map((location) => {
      fetchLocation(location);
    });
    setEvents(tempEventsArray);
  }, [savedLocations]);

  return { events, err, loading, savedLocations };
};
