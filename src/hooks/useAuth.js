import React, { createContext, useContext, useEffect, useState } from "react";
import { getCookie, clearCookie } from "utils";
import jwt_decode from "jwt-decode";

const StoreContext = createContext();

export const ProvideAuth = ({ children }) => {
  const [user, setUser] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

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
    <StoreContext.Provider value={{ user, isLoading, setUser, onLogout }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(StoreContext);
};
