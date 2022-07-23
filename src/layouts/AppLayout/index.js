import React, { Fragment, useEffect, useState } from "react";
import { SideBar } from "./SideBar";
import { Chats } from "components";
import { useLocalStorage, useRouter } from "hooks";
import { Outlet } from "react-router-dom";

import styles from "./AppLayout.module.scss";

const AppLayout = () => {
  const { getItem, setItem } = useLocalStorage();

  const { pathName } = useRouter();

  const [width, setWidth] = useState(window.innerWidth);

  const [theme, setTheme] = useState();

  useEffect(() => {
    document.body.classList.add("hide-scroll");
    window.addEventListener("resize", handleResize);
    let val = getItem("theme") ?? "light";
    let root = document.querySelector(":root");
    root.setAttribute("data-theme", val);
    setTheme(val);
    return () => {
      document.body.classList.remove("hide-scroll");
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleTheme = (val) => () => {
    let root = document.querySelector(":root");
    root.setAttribute("data-theme", val);
    setItem("theme", val);
    setTheme(val);
  };

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  return (
    <Fragment>
      {pathName !== "/conversation" && (
        <SideBar theme={theme} toggleTheme={toggleTheme} />
      )}
      {pathName === "/conversation" ? (
        <Chats />
      ) : (
        <div className={styles.app_layout}>
          <div className={styles.pages_container}>
            <Outlet />
          </div>
          {width > 768 && <Chats />}
        </div>
      )}
    </Fragment>
  );
};

export default AppLayout;
