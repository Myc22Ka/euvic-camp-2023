import { useEffect, useState, useCallback } from "react";
import { useSavedLocations } from "./useSavedLocations";
import { useNavigate } from "react-router-dom";
import { generateRequest } from "../constants";
import { eventFixArray } from "../utils/filters";

export const useFetchEvents = ({ category, limit, location, q, state, label, phq_attendance }: FetchRequest) => {
  const request = generateRequest({ category, limit, location, q, state, label, phq_attendance });

  const navigate = useNavigate();
  const { savedLocations } = useSavedLocations();
  const [events, setEvents] = useState<EventfulEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);

  const changeEventsDisplay = useCallback((newEventsDisplay: EventfulEvent[]) => {
    setEvents(newEventsDisplay);
  }, []);

  const fetchLocation = useCallback(
    async (location: string, request: string) => {
      let baseEndpoint: string = `https://api.predicthq.com/v1/saved-locations/${location}/insights/events`;

      if (q || label || phq_attendance.gte || phq_attendance.lte || state)
        baseEndpoint = `https://api.predicthq.com/v1/events`;

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
    },
    [q, label, phq_attendance.gte, phq_attendance.lte, state]
  );

  useEffect(() => {
    setLoading(true);

    if (!savedLocations) {
      setErr("An error occurred while fetching saved locations.");
      setLoading(false);
      return;
    }

    if (location === "all") {
      // Fetch data for all locations
      Promise.all(savedLocations.map((location) => fetchLocation(location.location_id, request)))
        .then((results) => {
          const filteredResults = results.filter((result) => result !== null);
          if (request.length > 1) navigate(request);

          setEvents(eventFixArray(filteredResults)); // Update events array with fetched data
        })
        .catch(() => {
          setErr("An error occurred while fetching data.");
        })
        .finally(() => setLoading(false));
      return;
    }

    fetchLocation(location, request)
      .then((data) => {
        if (request.length > 1) navigate(request);

        setEvents(eventFixArray([data]));
      })
      .catch(() => setErr("An error occurred while fetching data"))
      .finally(() => setLoading(false));
  }, [savedLocations, category, limit, location, q, state, label, phq_attendance.gte, phq_attendance.lte]);

  return { events, err, loading, savedLocations, changeEventsDisplay };
};
