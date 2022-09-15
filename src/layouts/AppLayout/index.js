import React, { Fragment, useEffect, useState } from "react";
import { SideBar } from "./SideBar";
import { Chats, ScrollBar } from "components";
import { useAuth } from "hooks";
import { classNames, localStorage } from "utils";
import { Outlet } from "react-router-dom";

import styles from "./AppLayout.module.scss";

const AppLayout = () => {
  const { chatId, isLoading } = useAuth();

  const storage = localStorage();

  const [theme, setTheme] = useState();

  useEffect(() => {
    Notification.permission !== "granted" && requestNotificationPermission();
    let val = storage.get("theme") ?? "light";
    let root = document.querySelector(":root");
    root.setAttribute("theme", val);
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
    let root = document.querySelector(":root");
    root.setAttribute("theme", value);
    storage.set("theme", value);
    setTheme(value);
  };

  return (
    <Fragment>
      {/* <SideBar
        className={classNames(chatId && styles.hide)}
        theme={theme}
        toggleTheme={toggleTheme}
      /> */}
      <div className={styles.app_layout}>
        <div className={styles.pages_container}>{/* <Outlet /> */}</div>
        {!isLoading && (
          <Fragment>
            {chatId ? (
              <Chats />
            ) : (
              <div className={styles.empty_chat}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 490 490"
                  style={{ enableBackground: "new 0 0 490 490" }}
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <g>
                        <path d="M460,154.999H360v-120c0-16.542-13.458-30-30-30H30c-16.542,0-30,13.458-30,30v190c0,16.542,13.458,30,30,30h5v65     c0,4.107,2.512,7.797,6.333,9.303c1.191,0.47,2.433,0.697,3.665,0.697c2.719,0,5.384-1.11,7.313-3.177l67.035-71.823H130v120     c0,16.542,13.458,30,30,30h190v70c0,4.044,2.437,7.691,6.173,9.239c1.237,0.513,2.536,0.762,3.825,0.762     c2.602,0,5.16-1.017,7.073-2.929L444.142,405H460c16.542,0,30-13.458,30-30v-190C490,168.458,476.542,154.999,460,154.999z      M130,184.999v50h-15c-2.772,0-5.419,1.15-7.311,3.177L55,294.63v-49.63c0-5.523-4.477-10-10-10H30c-5.514,0-10-4.486-10-10v-190     c0-5.514,4.486-10,10-10h300c5.514,0,10,4.486,10,10v120H160C143.458,154.999,130,168.458,130,184.999z M470,375     c0,5.514-4.486,10-10,10h-20c-2.652,0-5.196,1.054-7.071,2.929L370,450.857V395c0-5.523-4.477-10-10-10H160     c-5.514,0-10-4.486-10-10v-190c0-5.514,4.486-10,10-10h300c5.514,0,10,4.486,10,10V375z" />
                        <rect x={110} y="54.999" width={190} height={20} />
                        <rect x={60} y="104.999" width={240} height={20} />
                        <rect x={60} y="154.999" width={50} height={20} />
                        <rect x={60} y="54.999" width={35} height={20} />
                        <rect x={180} y="219.999" width={260} height={20} />
                        <rect x={180} y={270} width={260} height={20} />
                        <rect x={180} y={320} width={190} height={20} />
                        <rect x={390} y={320} width={50} height={20} />
                      </g>
                    </g>
                  </g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                  <g></g>
                </svg>
                <div>
                  <b>It's nice to chat with somone</b>
                  <span>
                    Pick a person from left menu and start your conversation
                  </span>
                </div>
              </div>
            )}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default AppLayout;
