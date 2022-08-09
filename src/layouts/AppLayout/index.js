import React, { Fragment, useEffect, useState } from "react";
import { SideBar } from "./SideBar";
import { Chats, ScrollBar } from "components";
import { useLocalStorage, useRouter, useWindowSize } from "hooks";
import { Outlet } from "react-router-dom";

import styles from "./AppLayout.module.scss";

const AppLayout = () => {
  const { getItem, setItem } = useLocalStorage();

  const {
    query: { chatId = null },
  } = useRouter();

  const [theme, setTheme] = useState();

  const { width } = useWindowSize();

  useEffect(() => {
    Notification.permission !== "granted" && requestNotificationPermission();
    document.body.classList.add("hide-scroll");
    let val = getItem("theme") ?? "light";
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
    setItem({ key: "theme", value });
    setTheme(value);
  };

  return (
    <Fragment>
      {width < 768 ? (
        !chatId && <SideBar theme={theme} toggleTheme={toggleTheme} />
      ) : (
        <SideBar theme={theme} toggleTheme={toggleTheme} />
      )}
      <div className={styles.app_layout}>
        {width < 768 ? (
          !chatId && (
            <div className={styles.pages_container}>
              <Outlet />
            </div>
          )
        ) : (
          <div className={styles.pages_container}>
            <Outlet />
            <ScrollBar />
          </div>
        )}
        {width < 768 ? chatId && <Chats /> : <Chats />}
      </div>
    </Fragment>
  );
};

export default AppLayout;
