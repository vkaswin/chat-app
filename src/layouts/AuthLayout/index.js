import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import authImg from "assets/images/auth-img.png";

import styles from "./AuthLayout.module.scss";

const AuthLayout = () => {
  return (
    <div className={styles.auth_container}>
      <div className={styles.auth_left}>
        <NavLink to="login">
          <div className={styles.title}>
            <i className="bxs-message-alt-detail"></i>
            <b>React Chat App</b>
          </div>
        </NavLink>
        <img src={authImg} className={styles.auth_img} />
      </div>
      <div className={styles.auth_right}>
        <div className={styles.auth_wrapper}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
