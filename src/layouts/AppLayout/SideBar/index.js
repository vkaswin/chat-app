import React, { useLayoutEffect, useRef } from "react";
import { useRouter } from "hooks";
import { NavLink } from "react-router-dom";
import { classNames } from "utils";
import { Avatar, DropDown, Tooltip } from "components";

import styles from "./SideBar.module.scss";

export const SideBar = ({ theme, toggleTheme }) => {
  let tabRef = useRef();

  let indicatorRef = useRef();

  const { pathName } = useRouter();

  const tabs = [
    {
      icon: "bx-user-circle",
      label: "Profile",
      to: "profile",
    },
    {
      icon: "bx-conversation",
      label: "Chats",
      to: "chats",
    },
    {
      icon: "bxs-user-detail",
      label: "Contacts",
      to: "contacts",
    },
    {
      icon: "bx-phone-call",
      label: "Calls",
      to: "calls",
    },
    {
      icon: "bx-cog",
      label: "Settings",
      to: "settings",
    },
  ];

  const dropdown = [
    {
      label: "Profile",
      icon: "bx-user-circle",
      to: "profile",
    },
    {
      label: "Settings",
      icon: "bx-cog",
      to: "settings",
    },
    {
      label: "Change Password",
      icon: "bx-lock-open",
      to: "change-password",
    },
    {
      label: "Logout",
      icon: "bx-log-out-circle",
      to: "login",
    },
  ];

  useLayoutEffect(() => {
    let match = pathName.split("/")[1];
    let index = tabs.findIndex(({ to }) => to === match);

    let { clientHeight, offsetTop } = tabRef.current?.children[index];

    indicatorRef.current.style.height = `${clientHeight}px`;
    indicatorRef.current.style.top = `${offsetTop}px`;
  }, [pathName]);

  return (
    <div className={styles.sidebar}>
      <div>
        <div className={styles.logo}>
          <i className="bxs-message-alt-detail"></i>
        </div>
        <div className={styles.top_nav} ref={tabRef}>
          {tabs.map(({ icon, label, to }, index) => {
            return (
              <NavLink
                key={index}
                to={to}
                className={({ isActive }) =>
                  classNames(styles.nav_item, { [styles.active]: isActive })
                }
              >
                <i className={icon} id={label.toLowerCase()}></i>
                <Tooltip
                  offset={20}
                  position="right-center"
                  selector={`#${label.toLowerCase()}`}
                >
                  <span>{label}</span>
                </Tooltip>
              </NavLink>
            );
          })}
          <div ref={indicatorRef} className={styles.tab_indicator}></div>
        </div>
      </div>
      <div>
        <div className={styles.bottom_nav}>
          <div className={styles.theme_icon}>
            {theme === "light" ? (
              <i className="bx-moon" onClick={toggleTheme("dark")}></i>
            ) : (
              <i className="bx-sun" onClick={toggleTheme("light")}></i>
            )}
          </div>
          <div id="avatar">
            <Avatar
              src="https://themesbrand.com/doot/layouts/assets/images/users/avatar-1.jpg"
              size={40}
              outline
            />
          </div>
          <DropDown selector="#avatar" position="top-center">
            {dropdown.map(({ label, icon, to }, index) => {
              return (
                <NavLink key={index} to={to}>
                  <DropDown.Item className={styles.avatar_option}>
                    <span>{label}</span>
                    <i className={icon}></i>
                  </DropDown.Item>
                </NavLink>
              );
            })}
          </DropDown>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
