import React, { Fragment, useState } from "react";
import { DropDown, Avatar, OffCanvas } from "components";
import { TextArea } from "./TextArea";
import { Conversation } from "./Conversation";

import styles from "./Chats.module.scss";

export const Chats = () => {
  const moreDropDown = [
    {
      label: "Archive",
      icon: "bx-archive",
    },
    {
      label: "Muted",
      icon: "bx-microphone-off",
    },
    {
      label: "Delete",
      icon: "bx-trash",
    },
  ];

  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const sendMessage = (msg) => {
    console.log(msg);
  };

  return (
    <Fragment>
      <Conversation />
      <div className={styles.chat_header}>
        <div className={styles.user_info}>
          <Avatar
            src="https://themesbrand.com/doot/layouts/assets/images/users/avatar-2.jpg"
            size={50}
            status
          />
          <div className={styles.user_name}>
            <b>Bella Cote</b>
            <span>Online</span>
          </div>
        </div>
        <div className={styles.chat_icons}>
          <i className="bx-search"></i>
          <i className="bxs-phone-call"></i>
          <i className="bx-video"></i>
          <i className="bxs-info-circle" onClick={toggleInfo}></i>
          <i className="bx-dots-vertical-rounded" id="more-option"></i>
          <DropDown selector="#more-option" position="bottom-end">
            {moreDropDown.map(({ label, icon }, index) => {
              return (
                <DropDown.Item key={index} className={styles.more_option}>
                  <span>{label}</span>
                  <i className={icon}></i>
                </DropDown.Item>
              );
            })}
          </DropDown>
        </div>
      </div>
      <TextArea onSend={sendMessage} />
      <OffCanvas
        isOpen={showInfo}
        position="right"
        className={styles.profile_sidebar}
        toggle={toggleInfo}
        overlay={false}
      >
        <div>helo</div>
      </OffCanvas>
    </Fragment>
  );
};
