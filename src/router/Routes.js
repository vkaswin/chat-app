export const routes = [
  {
    path: "/login",
    auth: false,
    component: "pages/Login",
    layout: "layouts/AuthLayout",
  },
  {
    path: "/register",
    auth: false,
    component: "pages/Register",
    layout: "layouts/AuthLayout",
  },
  {
    path: "/recover-password",
    auth: false,
    component: "pages/RecoverPassword",
    layout: "layouts/AuthLayout",
  },
  {
    path: "/change-password",
    auth: true,
    component: "pages/Register",
    layout: "layouts/AuthLayout",
  },
  {
    path: "/lock-screen",
    component: "pages/LockScreen",
    layout: "layouts/AuthLayout",
  },
  {
    path: "/logout",
    auth: false,
    component: "pages/Logout",
    layout: "layouts/AuthLayout",
  },
  {
    path: "/profile",
    auth: true,
    component: "pages/Profile",
    layout: "layouts/AppLayout",
  },
  {
    path: "/chats",
    auth: true,
    component: "pages/Chats",
    layout: "layouts/AppLayout",
  },
  {
    path: "/contacts",
    auth: true,
    component: "pages/Contacts",
    layout: "layouts/AppLayout",
  },
  {
    path: "/calls",
    auth: true,
    component: "pages/Calls",
    layout: "layouts/AppLayout",
  },
  {
    path: "/settings",
    auth: true,
    component: "pages/Settings",
    layout: "layouts/AppLayout",
  },
];
