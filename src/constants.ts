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

export const CATEGORIES: Array<{ name: string; component: IconType }> = [
  { name: "Sports", component: MdSportsBaseball },
  { name: "Conferences", component: MdSlideshow },
  { name: "Expos", component: MdShoppingCart },
  { name: "Concerts", component: MdOutlineMusicNote },
  { name: "Festivals", component: MdOutlineFestival },
  { name: "Performing Arts", component: MdBrush },
  { name: "Community", component: MdPeople },
  { name: "Academic", component: MdSchool },
];
