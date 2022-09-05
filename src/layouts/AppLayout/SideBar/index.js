import React, { useLayoutEffect, useMemo, useRef } from "react";
import { useAuth, useRouter } from "hooks";
import { NavLink } from "react-router-dom";
import { classNames } from "utils";
import { Avatar, DropDown, Tooltip } from "components";

import styles from "./SideBar.module.scss";

export const SideBar = ({ theme, toggleTheme, className }) => {
  let tabRef = useRef();

  let indicatorRef = useRef();

  const { pathName } = useRouter();

  const { logout, user } = useAuth();

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
      to: "/auth/change-password",
    },
  ];

  useLayoutEffect(() => {
    let index = tabs.findIndex(({ to }) => to === pathName.split("/")[1]);

    const { matches } = matchMedia(`(max-width: 768px)`);

    let { clientHeight, offsetTop, offsetLeft, clientWidth } =
      tabRef.current?.children[index];

    if (matches) {
      indicatorRef.current.style.width = `${clientWidth}px`;
      indicatorRef.current.style.left = `${offsetLeft}px`;
    } else {
      indicatorRef.current.style.height = `${clientHeight}px`;
      indicatorRef.current.style.top = `${offsetTop}px`;
    }
  }, [pathName]);

  const tooltipPlacement = useMemo(() => {
    const { matches } = matchMedia(`(max-width: 768px)`);
    return matches ? "top" : "right";
  }, []);

  return (
    <div className={`${styles.sidebar} ${className}`}>
      <div className={styles.logo}>
        <i className="bxs-message-alt-detail"></i>
      </div>
      <div className={styles.nav_wrapper} ref={tabRef}>
        {tabs.map(({ icon, label, to }, index) => {
          return (
            <NavLink
              key={index}
              to={to}
              className={({ isActive }) =>
                classNames(styles.nav_item, {
                  [styles.active]: isActive,
                })
              }
            >
              <i
                className={classNames(icon, styles.nav_icon)}
                id={`nav-${index}`}
              ></i>
              <Tooltip
                offset={20}
                placement={tooltipPlacement}
                selector={`#nav-${index}`}
              >
                <span>{label}</span>
              </Tooltip>
            </NavLink>
          );
        })}
        <div className={classNames(styles.nav_item, styles.theme)}>
          <div className={styles.nav_icon}>
            <i
              id="theme"
              className={theme === "light" ? "bx-moon" : "bx-sun"}
              onClick={toggleTheme(theme === "light" ? "dark" : "light")}
            ></i>
            <Tooltip placement={tooltipPlacement} selector="#theme" offset={20}>
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </Tooltip>
          </div>
        </div>
        <div
          id="avatar"
          className={classNames(styles.nav_item, styles.profile)}
        >
          <Avatar
            src={user?.avatar}
            name={user?.name}
            size={40}
            outline
            status={true}
            userId={user?.id}
          />
        </div>
        <DropDown selector="#avatar" placement="top">
          {dropdown.map(({ label, icon, to }, index) => {
            return (
              <NavLink key={index} to={to}>
                <DropDown.Item className="dropdown-option">
                  <span>{label}</span>
                  <i className={icon}></i>
                </DropDown.Item>
              </NavLink>
            );
          })}
          <DropDown.Item onClick={logout} className="dropdown-option">
            <span>Logout</span>
            <i className="bx-log-out-circle"></i>
          </DropDown.Item>
        </DropDown>
        <div ref={indicatorRef} className={styles.tab_indicator}></div>
      </div>
    </div>
  );
};

export default SideBar;
