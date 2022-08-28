import React, { createContext, useContext, useEffect, useState } from "react";
import { cookies, sessionStorage } from "utils";
import jwtDecode from "jwt-decode";
import { socket } from "socket";

const AuthContext = createContext();

export const ProvideAuth = ({ children }) => {
  const [user, setUser] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [chatId, setChatId] = useState();

  const cookie = cookies();

  const session = sessionStorage();

  useEffect(() => {
    document.addEventListener("logout", logout);
    document.addEventListener("chatId", handleChat);
    const token = cookie.get("authToken");
    const chatId = session.get("chatId");
    if (token !== null) {
      const user = jwtDecode(token);
      !socket.io && socket.init(user.id);
      setUser(user);
    }
    if (chatId) {
      setChatId(chatId);
    }
    setIsLoading(false);
    return () => {
      socket.close();
      document.removeEventListener("logout", logout);
    };
  }, []);

  const setUserData = (user) => {
    !socket.io && socket.init(user.id);
    setUser(user);
  };

  const handleChat = ({ detail: { chatId } }) => {
    setChatId(chatId);
  };

  const logout = () => {
    cookie.remove("authToken");
    window.location.href =
      process.env.NODE_ENV === "development"
        ? "/auth/login"
        : "/react-chat-app/#/auth/login";
  };

  return (
    <AuthContext.Provider
      value={{ user, chatId, isLoading, setUser: setUserData, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
