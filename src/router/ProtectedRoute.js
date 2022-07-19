import React from "react";
import { Navigate } from "react-router";
import { getCookie } from "utils";

export const ProtectedRoute = ({ component, auth = true }) => {
  const token = getCookie("authToken");

  //   if (auth && token) return component;

  //   if (auth && !token) return <Navigate replace to="/auth/login" />;

  //   if (auth === false && token) return <Navigate replace to="/chats" />;

  return component;
};
