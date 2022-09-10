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

  const handleChat = (chatId) => {
    const oldChatId = session.get("chatId");

    if (oldChatId === chatId) return;

    session.set("chatId", chatId);
    oldChatId && socket.emit("leave-room", oldChatId);
    socket.emit("join-room", chatId);
    setChatId(chatId);
  };

  const clearChatId = () => {
    session.remove("chatId");
    setChatId(null);
  };

  const logout = () => {
    socket.close();
    cookie.remove("authToken");
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        chatId,
        isLoading,
        setUser,
        logout,
        clearChatId,
        handleChat,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
