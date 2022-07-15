export const routes = [
  {
    path: "auth",
    componentPath: "layouts/AuthLayout",
    children: [
      {
        path: "login",
        isAuthPage: true,
        componentPath: "pages/Login",
      },
      {
        path: "register",
        isAuthPage: true,
        componentPath: "pages/Register",
      },
      {
        path: "recover-password",
        isAuthPage: true,
        componentPath: "pages/RecoverPassword",
      },
      {
        path: "change-password",
        isAuthPage: true,
        componentPath: "pages/Register",
      },
      {
        path: "lock-screen",
        isAuthPage: true,
        componentPath: "pages/LockScreen",
      },
      {
        path: "logout",
        isAuthPage: true,
        componentPath: "pages/Logout",
      },
    ],
  },
  {
    path: "app",
    componentPath: "layouts/AppLayout",
    children: [
      {
        path: "profile",
        isAuthenticated: true,
        componentPath: "pages/Profile",
      },
      {
        path: "chats",
        isAuthenticated: true,
        componentPath: "pages/Chats",
      },
      {
        path: "contacts",
        isAuthenticated: true,
        componentPath: "pages/Contacts",
      },
      {
        path: "calls",
        isAuthenticated: true,
        componentPath: "pages/Calls",
      },
      {
        path: "bookmarks",
        isAuthenticated: true,
        componentPath: "pages/BookMarks",
      },
      {
        path: "settings",
        isAuthenticated: true,
        componentPath: "pages/Settings",
      },
    ],
  },
];
