import React, { Fragment, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "./SideBar";
import { Chats } from "./Chats";
import { useLocalStorage } from "hooks";

import styles from "./AppLayout.module.scss";

const AppLayout = () => {
  const { getItem, setItem } = useLocalStorage();

  const [theme, setTheme] = useState();

  useEffect(() => {
    let val = getItem("theme") ?? "light";
    let root = document.querySelector(":root");
    root.setAttribute("data-theme", val);
    setTheme(val);
  }, []);

  const toggleTheme = (val) => () => {
    let root = document.querySelector(":root");
    root.setAttribute("data-theme", val);
    setItem("theme", val);
    setTheme(val);
  };

  return (
    <Fragment>
      <div className={styles.app_layout}>
        <div>
          <div className={styles.pages_container}>
            <Outlet />
          </div>
        </div>
        <Chats />
      </div>
      <SideBar theme={theme} toggleTheme={toggleTheme} />
    </Fragment>
  );
};

export default AppLayout;
