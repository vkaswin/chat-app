import { Avatar } from "components";
import React from "react";

import styles from "./StatusPopup.module.scss";

const StatusPopup = () => {
  let {
    _id: userId = "63033ccb39175ac026b70761",
    name = "Karthick Kumar",
    email = "karthick@gmail.com",
    status = false,
    avatar = "https://firebasestorage.googleapis.com/v0/b/node-chat-app-88711.appspot.com/o/image%2Favataaars%20(2).png?alt=media",
    colorCode = "#11C1DA",
  } = {};
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.indicator}></div>
          <div className={styles.avatar}>
            <Avatar src={avatar || colorCode} name={name} userId={userId} />
          </div>
        </div>
        <div className={styles.media}>
          <img src="https://firebasestorage.googleapis.com/v0/b/node-chat-app-88711.appspot.com/o/image%2Fdownload (1).jpeg?alt=media" />
        </div>
        <div className={styles.footer}></div>
      </div>
    </div>
  );
};

export default StatusPopup;
