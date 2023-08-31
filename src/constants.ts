import {
  MdSportsBaseball,
  MdOutlineFestival,
  MdOutlineMusicNote,
  MdPeople,
  MdSchool,
  MdSlideshow,
  MdBrush,
  MdShoppingCart,
} from "react-icons/md";
import { IconType } from "react-icons/lib";

export type CATEGORIES_TYPE = Array<{ name: string; icon: IconType; details: string }>;

export const CATEGORIES: CATEGORIES_TYPE = [
  {
    name: "Sports",
    icon: MdSportsBaseball,
    details:
      "A sports competition consists of multiple players or teams. It has a certain theme or goals with its own rules to regulate and a dedicated environment as well.",
  },
  {
    name: "Conferences",
    icon: MdSlideshow,
    details: "A formal meeting or forum relating to a certain topic between a group of people with shared interests.",
  },
  {
    name: "Expos",
    icon: MdShoppingCart,
    details:
      "An industrial exhibition for communicating and trading purpose between business, or a trade fair that connects business and customers.",
  },
  {
    name: "Concerts",
    icon: MdOutlineMusicNote,
    details:
      "A musical performance where the primary intention of attendance is to see the musical artist or listen to music.",
  },
  {
    name: "Festivals",
    icon: MdOutlineFestival,
    details: "A commonly known day or a period of time when people gather together to celebrate a specific reason.",
  },
  {
    name: "Performing Arts",
    icon: MdBrush,
    details: "A show or an exhibition of creative activities for an audience, for example, a circus show.",
  },
  {
    name: "Community",
    icon: MdPeople,
    details:
      "This category includes various types of events, for example, a college event, a community party, or a fan meeting.",
  },
  {
    name: "Academic",
    icon: MdSchool,
    details: "Academic Events are captured from an individual higher education institute's academic calendar.",
  },
];

export const defaultFetchOptions: FetchRequest = {
  location: "all",
  category: "",
  limit: 10,
  q: "",
  state: "",
  label: "",
  phq_attendance: {
    gte: 0,
    lte: 0,
  },
};

export const generateRequest = (options: FetchRequest): string => {
  const request = `?${Object.entries(options)
    .map((option) => {
      const key = option[0];
      const value = option[1];

      if (key === "location") return "";

      if (key === "phq_attendance" && typeof value === "object") {
        const phqValue = value as { gte: number; lte: number };

        const gte = phqValue.gte !== defaultFetchOptions.phq_attendance.gte ? `phq_attendance.gte=${phqValue.gte}` : "";
        const lte = phqValue.lte !== defaultFetchOptions.phq_attendance.lte ? `phq_attendance.lte=${phqValue.lte}` : "";

        return lte || gte ? [gte, lte].filter((e) => e).join("&") : "";
      }

      return value && defaultFetchOptions[key as keyof FetchRequest] !== value ? `${key}=${value}` : "";
    })
    .filter((e) => e)
    .join("&")}`;

  return request;
};

export const findAddress = (event: resultsEvent, location: EventfulEvent, savedLocations: SavedLocations[] | null) => {
  return (
    event.entities[0]?.formatted_address ??
    savedLocations?.find((id) => id.location_id === location.location_id)?.formatted_address
  );
};
