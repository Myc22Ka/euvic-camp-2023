import SignIn from "./auth/SignIn";
import Home from "./pages/Home";
import SignOut from "./auth/SignOut";
import { Route } from "./types/types";
import Category from "./pages/Category";
import { CATEGORIES } from "./constants";

export const routes: Route[] = [
  {
    url: "home",
    component: Home,
  },
  {
    url: "sign in",
    component: SignIn,
  },
  {
    url: "sign out",
    component: SignOut,
  },
  {
    url: CATEGORIES.map((category) => category.name),
    component: Category,
  },
];
