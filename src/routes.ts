import SignIn from "./auth/SignIn";
import Home from "./pages/Home";
import SignOut from "./auth/SignOut";
import Category from "./pages/Category";

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
    url: "category",
    component: Category,
  },
];
