import React, { createContext, useContext, useEffect, useState } from "react";
import { cookies } from "utils";
import jwt_decode from "jwt-decode";
import { socket } from "socket";

const AuthContext = createContext();

export const ProvideAuth = ({ children }) => {
  const [user, setUser] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const cookie = cookies();

  useEffect(() => {
    document.addEventListener("logout", logout);
    let token = cookie.get("authToken");
    if (token !== null) {
      const user = jwt_decode(token);
      socket.init(user.id);
      setUser(user);
    }
    setIsLoading(false);
    return () => document.removeEventListener("logout", logout);
  }, []);

  const logout = () => {
    cookie.remove("authToken");
    window.location.href =
      process.env.NODE_ENV === "development"
        ? "/auth/login"
        : "/react-chat-app/#/auth/login";
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
