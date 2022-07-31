import React from "react";
import { DropDown } from "components";
import { classNames } from "utils";

import styles from "./Conversation.module.scss";

export const Conversation = ({ chats, onDelete, onCopy, onReply }) => {
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
              <DropDown selector={`#chat-option-${index}`} placement="bottom">
                <DropDown.Item
                  className={styles.chat_option}
                  onClick={() => onReply(msg)}
                >
                  <span>Reply</span>
                  <i className="bx-share"></i>
                </DropDown.Item>
                <DropDown.Item className={styles.chat_option}>
                  <span>Forward</span>
                  <i className="bx-share-alt"></i>
                </DropDown.Item>
                <DropDown.Item
                  className={styles.chat_option}
                  onClick={() => onCopy(msg)}
                >
                  <span>Copy</span>
                  <i className="bx-copy"></i>
                </DropDown.Item>
                <DropDown.Item className={styles.chat_option}>
                  <span>Mark as Unread</span>
                  <i className="bx-message-error"></i>
                </DropDown.Item>
                <DropDown.Item
                  className={styles.chat_option}
                  onClick={() => onDelete(index)}
                >
                  <span>Delete</span>
                  <i className="bx-trash"></i>
                </DropDown.Item>
              </DropDown>
            </div>
          </div>
        );
      })}
    </div>
  );
};
