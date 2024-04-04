import Login from "@/pages/auth/Login";
import Redirect from "@/pages/Redirect";
import Logout from "@/pages/auth/Logout";
import Register from "@/pages/auth/Register";
import Artist from "@/pages/Artist";

export interface RouteElement {
  path: string;
  Element: () => JSX.Element;
}

// authentication route
const publicRoutes: RouteElement[] = [
  {
    path: "/login",
    Element: Login,
  },
  {
    path: "/register",
    Element: Register,
  },
  {
    path: "/logout",
    Element: Logout,
  },
  {
    path: "/",
    Element: Redirect,
  },
];

// private route
const privateRoutes: RouteElement[] = [
  // {
  //   path: "/dashboard",
  //   Element: Dashboard,
  // },
  // { path: "/question", Element: Question },
  // { path: "/profile", Element: Profile },
  // { path: "/org/accounts", Element: Accounts },
  // { path: "/chat", Element: Chats },
  // {
  //   path: "/artist",
  //   Element: Artist,
  // },
];

export { publicRoutes, privateRoutes };
