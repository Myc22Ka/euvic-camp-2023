import SignUp from "./auth/SignUp";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Category from "./pages/Category";

export const routes: Route[] = [
  {
    url: "home",
    component: Home,
  },
  {
    url: "sign up",
    component: SignUp,
  },
  {
    url: "login",
    component: Login,
  },
  {
    url: "category",
    component: Category,
  },
];
