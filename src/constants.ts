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

export type CATEGORIES_TYPE = Array<{ name: string; icon: IconType }>;

export const CATEGORIES: CATEGORIES_TYPE = [
  { name: "Sports", icon: MdSportsBaseball },
  { name: "Conferences", icon: MdSlideshow },
  { name: "Expos", icon: MdShoppingCart },
  { name: "Concerts", icon: MdOutlineMusicNote },
  { name: "Festivals", icon: MdOutlineFestival },
  { name: "Performing Arts", icon: MdBrush },
  { name: "Community", icon: MdPeople },
  { name: "Academic", icon: MdSchool },
];

export const defaultFetchOptions: FetchRequest = {
  category: "",
  limit: 10,
  location: "all",
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

      if (key === "phq_attendance" && typeof value === "object") {
        const phqValue = value as { gte: number; lte: number };

        const gte = phqValue.gte !== defaultFetchOptions.phq_attendance.gte ? `phq_attendance.gte=${phqValue.gte}` : "";
        const lte = phqValue.lte !== defaultFetchOptions.phq_attendance.lte ? `phq_attendance.lte=${phqValue.lte}` : "";

        return lte || gte ? [gte, lte].filter((e) => e).join("&") : "";
      }

      return value && defaultFetchOptions[key as keyof FetchRequest] !== value ? `${key}=${value}` : "";
    })
    .slice(1)
    .filter((e) => e)
    .join("&")}`;

  return request;
};
