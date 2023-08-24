import { useEffect, useState, useCallback } from "react";
import { useSavedLocations } from "./useSavedLocations";
import { useNavigate } from "react-router-dom";
import { defaultFetchOptions } from "../constants";

export const useFetchEvents = ({ category, limit, location, q, state, label }: FetchRequest) => {
  const navigate = useNavigate();
  const { savedLocations } = useSavedLocations();
  const [events, setEvents] = useState<EventfulEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);

  const changeEventsDisplay = useCallback((newEventsDisplay: EventfulEvent[]) => {
    setEvents(newEventsDisplay);
  }, []);

  useEffect(() => {
    setLoading(true);

    const options: FetchRequest = {
      location: location,
      category: category,
      limit: limit,
      q: q,
      state: state,
      label: label,
    };

    const request = `?${Object.entries(options)
      .map((option) => {
        const key = option[0];
        const value = option[1];

        return value && defaultFetchOptions[key as keyof FetchRequest] !== value ? `${key}=${value}` : "";
      })
      .slice(1)
      .filter((e) => e)
      .join("&")}`;

    const fetchLocation = async (location: string) => {
      const baseEndpoint =
        q || label
          ? `https://api.predicthq.com/v1/events`
          : `https://api.predicthq.com/v1/saved-locations/${location}/insights/events`;

      try {
        const response = await fetch(baseEndpoint + request, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            Accept: "application/json",
          },
        });

        const data = await response.json();
        return { ...data, location_id: location };
      } catch (err) {
        setErr("An error occurred while fetching data.");
        return null; // Return null to indicate an error
      }
    };

    if (!savedLocations) {
      setErr("An error occurred while fetching saved locations.");
      setLoading(false);
      return;
    }

    if (location === "all") {
      // Fetch data for all locations
      Promise.all(savedLocations.map((location) => fetchLocation(location.location_id)))
        .then((results) => {
          const filteredResults = results.filter((result) => result !== null);
          navigate(request);
          setEvents(filteredResults); // Update events array with fetched data
        })
        .catch(() => {
          setErr("An error occurred while fetching data.");
        })
        .finally(() => setLoading(false));
      return;
    }

    fetchLocation(location)
      .then((data) => {
        navigate(request);
        setEvents([data]);
      })
      .catch(() => setErr("An error occurred while fetching data"))
      .finally(() => setLoading(false));
  }, [savedLocations, category, limit, location, q, state, label]);

  return { events, err, loading, savedLocations, changeEventsDisplay };
};
