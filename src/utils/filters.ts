type sortParamType = "start" | "phq_attendance" | "rank" | "local_rank" | "duration" | "title";

export const filterEvents = (events: EventfulEvent[], sortParam: sortParamType) => {
  const newArray = events.flatMap((item) => {
    return item.results.map((event) => ({
      count: item.count,
      location_id: item.location_id,
      results: [event],
    }));
  });

  if (sortParam === "title") newArray.sort((a, b) => a.results[0].title.localeCompare(b.results[0].title));
  else if (sortParam === "start")
    newArray.sort((a, b) => new Date(a.results[0].start).setHours(0) - new Date(b.results[0].start).setHours(0));
  else
    newArray.sort((a, b) => {
      if (a.results[0][sortParam] === undefined) return 1; // Move a to the end
      if (b.results[0][sortParam] === undefined) return -1; // Move b to the end

      return +b.results[0][sortParam] - +a.results[0][sortParam];
    });

  return newArray;
};

export const ITEMS = [
  { name: "Earliest start date" },
  { name: "Latest start date" },
  { name: "Highest PHQ Rank" },
  { name: "Lowest PHQ Rank" },
  { name: "Highest Local Rank" },
  { name: "Lowest Local Rank" },
  { name: "Highest PHQ attendance" },
  { name: "Lowest PHQ attendance" },
  { name: "Longest duration" },
  { name: "Shortest duration" },
  { name: "Title (A-Z)" },
  { name: "Title (Z-A)" },
];

export const OPTIONS: sortParamType[] = ["start", "rank", "local_rank", "phq_attendance", "duration", "title"];
