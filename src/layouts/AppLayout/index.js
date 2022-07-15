import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "./SideBar";
import { Chats } from "./Chats";

import styles from "./AppLayout.module.scss";

const AppLayout = () => {
  return (
    <Fragment>
      <div className={styles.app_layout}>
        <Outlet />
        <div className={styles.chat_container}>
          <Chats />
        </div>
      </div>
      <SideBar />
    </Fragment>
  );
};

export default AppLayout;
