export const routes = [
  {
    path: "/",
    component: "layouts/AppLayout",
    children: [
      {
        path: "profile",
        auth: true,
        component: "pages/Profile",
      },
      {
        path: "chats",
        auth: true,
        component: "pages/Chats",
      },
      {
        path: "contacts",
        auth: true,
        component: "pages/Contacts",
      },
      {
        path: "calls",
        auth: true,
        component: "pages/Calls",
      },
      {
        path: "settings",
        auth: true,
        component: "pages/Settings",
      },
      {
        path: "status",
        auth: true,
        component: "pages/Status",
      },
    ],
  },
  {
    path: "/auth",
    component: "layouts/AuthLayout",
    children: [
      {
        path: "login",
        auth: false,
        component: "pages/Login",
      },
      {
        path: "register",
        auth: false,
        component: "pages/Register",
      },
      {
        path: "reset-password",
        auth: false,
        component: "pages/ResetPassword",
      },
      {
        path: "change-password",
        auth: true,
        component: "pages/ChangePassword",
      },
    ],
  },
];
