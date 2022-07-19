import React, { useLayoutEffect, useRef, useState } from "react";
import { DropDown, Avatar, OffCanvas } from "components";
import { TextArea } from "./TextArea";
import { Conversation } from "./Conversation";
import chatData from "data/chats.json";

import styles from "./Chats.module.scss";

export const Chats = () => {
  const chatContainerRef = useRef();

  const [chats, setChats] = useState(chatData.chats);

  const [showInfo, setShowInfo] = useState(false);

  useLayoutEffect(() => {
    const { scrollHeight } = chatContainerRef.current;

    chatContainerRef.current.scrollTo({
      top: scrollHeight,
      behavior: "smooth",
    });
  }, []);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const sendMessage = (msg) => {
    console.log(msg);
  };

  const { matches } = window.matchMedia(`(max-width: 768px)`);

  const moreDropDown = [
    {
      label: "View Profile",
      icon: "bx bx-user",
      onClick: () => toggleInfo(),
      show: matches,
    },
    {
      label: "Audio",
      icon: "bx bxs-phone-call",
      show: matches,
    },
    {
      label: "Video",
      icon: "bx bx-video",
      show: matches,
    },
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

  return (
    <div ref={chatContainerRef} className={styles.chat_wrapper}>
      <Conversation chats={chats} container={chatContainerRef} />
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
          <DropDown
            selector="#more-option"
            placement="bottom-end"
            zIndex={1026}
          >
            {moreDropDown.map(
              ({ label, icon, onClick = false, show = true }, index) => {
                return show ? (
                  <DropDown.Item
                    key={index}
                    className={styles.more_option}
                    {...(typeof onClick === "function" && { onClick })}
                  >
                    <span>{label}</span>
                    <i className={icon}></i>
                  </DropDown.Item>
                ) : null;
              }
            )}
          </DropDown>
        </div>
      </div>
      <TextArea onSend={sendMessage} />
      <OffCanvas
        isOpen={showInfo}
        position="right"
        className={styles.profile_sidebar}
        toggle={toggleInfo}
      >
        <div>helo</div>
      </OffCanvas>
    </div>
  );
};
