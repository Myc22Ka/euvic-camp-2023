import { AnimationProps, TargetAndTransition } from "framer-motion";
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

export const BUTTON_ANIMATION: AnimationProps & { whileTap: TargetAndTransition; whileHover: TargetAndTransition } = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: {
    duration: 0.3,
    ease: "easeOut",
  },
};

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
