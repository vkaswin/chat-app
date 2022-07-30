import React, { Fragment, useEffect, useState } from "react";
import { SideBar } from "./SideBar";
import { Chats } from "components";
import { useLocalStorage, useRouter } from "hooks";
import { Outlet } from "react-router-dom";

import styles from "./AppLayout.module.scss";

const AppLayout = () => {
  const { getItem, setItem } = useLocalStorage();

  const { pathName } = useRouter();

  const [theme, setTheme] = useState();

  useEffect(() => {
    document.body.classList.add("hide-scroll");
    let val = getItem("theme") ?? "light";
    let root = document.querySelector(":root");
    root.setAttribute("data-theme", val);
    setTheme(val);
    return () => {
      document.body.classList.remove("hide-scroll");
    };
  }, []);

  const toggleTheme = (val) => () => {
    let root = document.querySelector(":root");
    root.setAttribute("data-theme", val);
    setItem("theme", val);
    setTheme(val);
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
