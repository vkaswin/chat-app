import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { baseURL } from "config";
import { updateUserStatus } from "services/User";
import { useAuth } from "hooks";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const ProvideSocket = ({ children }) => {
  const [socket, setSocket] = useState();

  const [connected, setConnected] = useState(false);

  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!user) return;

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const webSocket = io(baseURL);

    webSocket.on("connect", () => setConnected(true));

    setSocket(webSocket);
  }, [isLoading]);

  useEffect(() => {
    if (!socket || !connected) return;

    socket.emit("join-user", user?.id);
    socket.on("user-status", handleUserStatus);

    updateUserStatus(true);
  }, [connected]);

  const handleVisibilityChange = () => {
    updateUserStatus(document.visibilityState === "visible");
  };

  const handleOnline = () => {
    console.log("online");
    updateUserStatus(true);
  };

  const handleOffline = () => {
    console.log("offline");
    updateUserStatus(false);
  };

  const handleUserStatus = ({ userId, status }) => {
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

  const close = () => {
    socket?.close();
    updateUserStatus({ status: false });
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    document.removeEventListener("online", handleOnline);
    document.removeEventListener("offline", handleOffline);
  };

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
};
