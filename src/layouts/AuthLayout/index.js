import React from "react";
import { Outlet } from "react-router-dom";

import authImg from "assets/images/auth-img.png";

import styles from "./AuthLayout.module.scss";

const AuthLayout = () => {
  return (
    <div className={styles.auth_container}>
      <div className={styles.auth_left}>
        <div className={styles.title}>
          <i className="bxs-message-alt-detail"></i>
          <b>Vue Chat App</b>
        </div>
        <img src={authImg} className={styles.auth_img} />
      </div>
      <div className={styles.auth_right}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
