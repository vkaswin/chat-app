import React from "react";
import { Navigate } from "react-router";
import { getCookie } from "utils";

export const ProtectedRoute = ({
  isAuthenticated,
  component,
  isAuthPage = false,
}) => {
  //   const token = getCookie("authToken");

  //   if (isAuthenticated && !token) return <Navigate replace to="/auth/login" />;

  //   if (isAuthPage && token) return <Navigate replace to="/app/profile" />;

  return component;
};
