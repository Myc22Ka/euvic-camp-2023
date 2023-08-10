interface EventfulEvent {
  count: number;
  results: resultsEvent[];
}

interface resultsEvent {
  id: string;
  title: string;
  description: string;
  entities: Entity[];
  place_hierarchies: string[][];
  timezone: string;
  location: [number, number]; // [longitude, latitude]
  start: string; // ISO 8601 date and time format
  end: string; // ISO 8601 date and time format
  duration: number; // Duration in seconds
  category: string;
  labels: string[];
  phq_attendance: number;
  rank: number;
  local_rank: number;
  geo: GeoInfo;
  state: "active" | "canceled" | "ended";
  predicted_event_spend: number;
  predicted_event_spend_industries: { [key: string]: number };
}

interface Entity {
  formatted_address: string;
  type: string;
  name: string;
}

interface GeoInfo {
  geometry: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  placekey: string;
}
