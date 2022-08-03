import React, { useEffect, useRef } from "react";
import { DropDown } from "components";
import { classNames } from "utils";
import { format } from "date-fns";

import styles from "./Conversation.module.scss";

export const Conversation = ({ chats, onDelete, onCopy, onReply, userId }) => {
  return (
    <div className={styles.conversation_container}>
      {chats.length > 0 &&
        chats.map(
          (
            {
              msg,
              date,
              from,
              to,
              chatId,
              _id,
              seen,
              reply: { msg: replyMsg = "", _id: replyMsgId } = {},
            },
            index
          ) => {
            return (
              <div
                key={index}
                className={classNames(styles.chat_wrapper, {
                  [styles.end]: userId === from,
                })}
                data-msgid={_id}
              >
                <div className={styles.chat_card}>
                  {replyMsg && (
                    <div className={styles.reply_card}>
                      <span>{replyMsg}</span>
                    </div>
                  )}
                  <div>
                    <span>{msg}</span>
                  </div>
                  <div className={styles.msg_time}>
                    <i className={`bx-time ${styles.clock}`}></i>
                    <span>{format(new Date(date), "h:mm aaa")}</span>
                    <i
                      className={`bx bx-check-double ${styles.tick}`}
                      data-seen={seen}
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
                    placement="bottom"
                  >
                    <DropDown.Item
                      className={styles.chat_option}
                      onClick={() => onReply(_id)}
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
          }
        )}
    </div>
  );
};
