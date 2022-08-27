import React, { Fragment, useEffect, useState } from "react";
import { SideBar } from "./SideBar";
import { Chats, ScrollBar } from "components";
import { localStorage } from "utils";
import { Outlet } from "react-router-dom";

import styles from "./AppLayout.module.scss";
import { useRouter } from "hooks";

const AppLayout = () => {
  const storage = localStorage();

  const [theme, setTheme] = useState();

  const {
    query: { chatId = null },
  } = useRouter();

  useEffect(() => {
    Notification.permission !== "granted" && requestNotificationPermission();
    let val = storage.get("theme") ?? "light";
    let root = document.querySelector(":root");
    root.setAttribute("data-theme", val);
    setTheme(val);
  }, []);

  const requestNotificationPermission = async () => {
    try {
      await Notification.requestPermission();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTheme = (value) => () => {
    console.log(value);
    let root = document.querySelector(":root");
    root.setAttribute("data-theme", value);
    storage.set({ key: "theme", value });
    setTheme(value);
  };

  return (
    <Fragment>
      {!chatId && <SideBar theme={theme} toggleTheme={toggleTheme} />}
      <div className={styles.app_layout}>
        <div className={styles.pages_container}>
          <Outlet />
        </div>
        {chatId ? (
          <Chats />
        ) : (
          <div className={styles.empty_chat}>Empyt Chat</div>
        )}
      </div>
    </Fragment>
  );
};

export default AppLayout;
