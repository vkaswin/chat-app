import React, { Fragment, useEffect, useState } from "react";
import { SideBar } from "./SideBar";
import { EmptyChat } from "./EmptyChat";
import { Chat } from "./Chat";
import { ScrollBar } from "components";
import { useAuth } from "hooks";
import { classNames, localStorage } from "utils";
import { getAllReactions } from "services/Chat";
import { Outlet } from "react-router-dom";

import styles from "./AppLayout.module.scss";

const AppLayout = () => {
  const { chatId, isLoading } = useAuth();

  const storage = localStorage();

  const [theme, setTheme] = useState();

  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    let val = storage.get("theme") ?? "light";
    let root = document.querySelector(":root");
    root.setAttribute("theme", val);
    getReactions();
    setTheme(val);
  }, []);

  const getReactions = async () => {
    try {
      let {
        data: { data },
      } = await getAllReactions();
      setReactions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTheme = (value) => () => {
    let root = document.querySelector(":root");
    root.setAttribute("theme", value);
    storage.set("theme", value);
    setTheme(value);
  };

  return (
    <Fragment>
      <SideBar
        className={classNames(chatId && styles.hide)}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <div className={styles.app_layout}>
        <div className={styles.pages_container}>
          <Outlet />
        </div>
        {!isLoading && (
          <Fragment>
            {chatId ? <Chat reactions={reactions} /> : <EmptyChat />}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default AppLayout;
