import React, { createContext, useContext, useEffect, useState } from "react";
import { getCookie, clearCookie } from "utils";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export const ProvideAuth = ({ children }) => {
  const [user, setUser] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.addEventListener("logout", logout);
    let token = getCookie("authToken");
    if (token !== null) {
      setUser(jwt_decode(token));
    }
    setIsLoading(false);
    return () => document.removeEventListener("logout", logout);
  }, []);

  const logout = () => {
    clearCookie("authToken");
    window.location.href = "/auth/login";
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
