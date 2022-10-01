import React from "react";
import { Navigate } from "react-router";
import { cookies } from "utils";

export const ProtectedRoute = ({ component, auth = true }) => {
  const cookie = cookies();

  const token = cookie.get("authToken");

  if (auth && token) return component;

  if (auth && !token) return <Navigate replace to="/login" />;

  if (auth === false && token) return <Navigate replace to="/chats" />;

  return component;
};
