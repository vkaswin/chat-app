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
    document.addEventListener("socket", handleSocket);
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

  const handleSocket = () => {
    const token = cookie.get("authToken");

    if (!token) return;

    const user = jwtDecode(token);
    socket.emit("join-user", user?.id);

    socket.on("user-status", handleUserStatus);
  };

  const handleUserStatus = ({ userId, status }) => {
    const token = cookie.get("authToken");

    if (!token) return;

    const user = jwtDecode(token);

    if (userId === user?.id) return;

    const elements = document.querySelectorAll(`[userid='${userId}']`);

    elements.forEach((ele) => {
      if (ele.tagName === "SPAN") {
        ele.textContent = status ? "Online" : "Offline";
      } else {
        ele.setAttribute("status", status);
      }
    });
  };

  const handleChat = ({ detail: { chatId, oldChatId } }) => {
    socket.emit("leave-chat", oldChatId);
    socket.emit("join-chat", chatId);
    setChatId(chatId);
  };

  const logout = () => {
    document.dispatchEvent(new CustomEvent("close-socket"));
    cookie.remove("authToken");
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
