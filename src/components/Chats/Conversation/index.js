import React from "react";
import { classNames } from "utils";
import { DropDown } from "components";

import styles from "./Conversation.module.scss";

export const Conversation = ({ chats }) => {
  const dropDown = [
    {
      icon: "bx-share ms-2",
      label: "Reply",
    },
    {
      icon: "bx-share-alt",
      label: "Forward",
    },
    {
      icon: "bx-copy text-muted",
      label: "Copy",
    },
    {
      icon: "bx-bookmarks text-muted",
      label: "Bookmark",
    },
    {
      icon: "bx-message-error",
      label: "Mark as Unread",
    },
    {
      icon: "bx-trash text-muted",
      label: "Delete",
    },
  ];

  return (
    <div className={styles.conversation_container}>
      {chats.map(({ msg, datetime }, index) => {
        return (
          <div
            key={index}
            className={classNames(styles.chat_wrapper, {
              [styles.end]: index % 2 === 0,
            })}
          >
            <div className={styles.chat_card}>
              <div>
                <span>{msg}</span>
              </div>
              <div className={styles.msg_time}>
                <i className={`bx-time ${styles.clock}`}></i>
                <span>{datetime}</span>
                <i
                  className={`bx bx-check-double ${styles.tick}`}
                  data-seen={true}
                ></i>
              </div>
            </div>
            <div className={styles.options}>
              <i
                className="bx-dots-vertical-rounded"
                id={`chat-option-${index}`}
              ></i>
              <DropDown
                selector={`#chat-option-${index}`}
                placement="bottom-center"
                container="#chat-container"
              >
                {dropDown.map(({ label, icon }, index) => {
                  return (
                    <DropDown.Item key={index} className={styles.chat_option}>
                      <span>{label}</span>
                      <i className={icon}></i>
                    </DropDown.Item>
                  );
                })}
              </DropDown>
            </div>
          </div>
        );
      })}
    </div>
  );
};
