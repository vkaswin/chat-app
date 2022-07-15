import React, { createContext, useContext, useEffect, useState } from "react";
import { getCookie, clearCookie } from "utils";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export const ProvideAuth = ({ children }) => {
  let [user, setUser] = useState(false);

  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let token = getCookie("authToken");
    if (token !== null) {
      setUser(jwt_decode(token));
    }
    setIsLoading(false);
  }, []);

  const onLogout = () => {
    clearCookie("authToken");
    window.location.href = "/auth/login";
  };

  return (
    <AuthContext.Provider value={(user, isLoading, setUser, onLogout)}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
