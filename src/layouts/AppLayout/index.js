import React, { Fragment, useEffect, useState } from "react";
import { SideBar } from "./SideBar";
import { Chats, ScrollBar } from "components";
import { localStorage } from "utils";
import { Outlet } from "react-router-dom";

import styles from "./AppLayout.module.scss";

const AppLayout = () => {
  const storage = localStorage();

  const [theme, setTheme] = useState();

  useEffect(() => {
    Notification.permission !== "granted" && requestNotificationPermission();
    document.body.classList.add("hide-scroll");
    let val = storage.get("theme") ?? "light";
    let root = document.querySelector(":root");
    root.setAttribute("data-theme", val);
    setTheme(val);
    return () => {
      document.body.classList.remove("hide-scroll");
    };
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
      <SideBar theme={theme} toggleTheme={toggleTheme} />
      <div className={styles.app_layout}>
        <div className={styles.pages_container}>
          <Outlet />
        </div>
        <Chats />
      </div>
    </Fragment>
  );
};

export default AppLayout;
