import { useCallback, useEffect, useState } from "react";

export const useFetchCounts = () => {
  const [counts, setCounts] = useState<CountsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getCounts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.predicthq.com/v1/events/count", {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          Accept: "application/json",
        },
      });

      const responseData = await response.json();
      setCounts(responseData);
    } catch (err) {
      setError("An error occurred while fetching counts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCounts();
  }, []);

  return { loading, error, counts };
};
