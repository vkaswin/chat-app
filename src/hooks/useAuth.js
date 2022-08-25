import React, { createContext, useContext, useEffect, useState } from "react";
import { cookies } from "utils";
import jwtDecode from "jwt-decode";
import { socket } from "socket";

const AuthContext = createContext();

export const ProvideAuth = ({ children }) => {
  const [user, setUser] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [status, setStatus] = useState({});

  const cookie = cookies();

  useEffect(() => {
    // window.addEventListener("beforeunload", handleBeforeUnLoad);
    document.addEventListener("logout", logout);
    let token = cookie.get("authToken");
    if (token !== null) {
      const user = jwtDecode(token);
      !socket.io && socket.init(user.id, handleStatus);
      setUser(user);
    }
    setIsLoading(false);
    return () => {
      socket.close();
      document.removeEventListener("logout", logout);
    };
  }, []);

  const handleStatus = ({ userId, status }) => {
    setStatus((prev) => {
      return { ...prev, [userId]: status };
    });
  };

  //   const handleBeforeUnLoad = (e) => {
  //     socket.io.emit("close-browser");
  //   };

  const setUserData = (user) => {
    !socket.io && socket.init(user.id, handleStatus);
    setUser(user);
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
      value={{ user, status, isLoading, setUser: setUserData, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
