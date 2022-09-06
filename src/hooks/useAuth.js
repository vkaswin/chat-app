import React, { createContext, useContext, useEffect, useState } from "react";
import { cookies, sessionStorage } from "utils";
import jwtDecode from "jwt-decode";
import { useRouter } from "./useRouter";
import { socket } from "socket";

const AuthContext = createContext();

export const ProvideAuth = ({ children }) => {
  const [user, setUser] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [chatId, setChatId] = useState();

  const cookie = cookies();

  const session = sessionStorage();

  const router = useRouter();

  useEffect(() => {
    document.addEventListener("logout", logout);
    document.addEventListener("chatId", handleChat);
    const token = cookie.get("authToken");
    const chatId = session.get("chatId");
    if (token !== null) {
      const user = jwtDecode(token);
      socket.init(user?.id);
      setUser(user);
    }
    chatId && setChatId(chatId);
    setIsLoading(false);
  }, []);

  const handleChat = ({ detail: { chatId } }) => {
    setChatId(chatId);
  };

  const logout = () => {
    document.dispatchEvent(new CustomEvent("close-socket"));
    cookie.remove("authToken");
    document.removeEventListener("logout", logout);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, chatId, isLoading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
