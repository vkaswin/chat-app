import React, { Fragment } from "react";
import { DropDown } from "components";
import { classNames } from "utils";
import moment from "moment";

import styles from "./Conversation.module.scss";

export const Conversation = ({
  chats,
  onDelete,
  onCopy,
  onReply,
  userId,
  focusMsgById,
}) => {
  return (
    <div className={styles.section}>
      {Object.entries(chats).map(([date, conversation], key) => {
        return (
          <Fragment key={key}>
            <div className={styles.date}>
              <span>{moment(date).format("D MMMM YYYY")}</span>
            </div>
            <div className={styles.container}>
              {conversation.map(
                ({ msg, date, sender, _id, seen, reply = null }, index) => {
                  return (
                    <div
                      key={index}
                      className={classNames(styles.chat_wrapper, {
                        [styles.end]: userId === sender,
                      })}
                      msgid={_id}
                    >
                      <div className={styles.chat_card}>
                        {reply && (
                          <div
                            className={styles.reply_card}
                            onClick={() => focusMsgById(reply._id)}
                          >
                            <span>{reply.msg}</span>
                          </div>
                        )}
                        <div>
                          <span>{msg}</span>
                        </div>
                        <div className={styles.msg_time}>
                          <i className={`bx-time ${styles.clock}`}></i>
                          <span>{moment(new Date(date)).format("h:mm a")}</span>
                          <i
                            className={`bx bx-check-double ${styles.tick}`}
                            seen={seen.toString()}
                          ></i>
                        </div>
                      </div>
                      <div className={styles.options}>
                        <i
                          className="bx-dots-vertical-rounded"
                          id={`option-${key}${index}`}
                        ></i>
                        <DropDown
                          selector={`#option-${key}${index}`}
                          placement="bottom"
                        >
                          <DropDown.Item
                            className="dropdown-option"
                            onClick={() => onReply(date, _id)}
                          >
                            <span>Reply</span>
                            <i className="bx-share"></i>
                          </DropDown.Item>
                          <DropDown.Item className="dropdown-option">
                            <span>Forward</span>
                            <i className="bx-share-alt"></i>
                          </DropDown.Item>
                          <DropDown.Item
                            className="dropdown-option"
                            onClick={() => onCopy(msg)}
                          >
                            <span>Copy</span>
                            <i className="bx-copy"></i>
                          </DropDown.Item>
                          <DropDown.Item className="dropdown-option">
                            <span>Mark as Unread</span>
                            <i className="bx-message-error"></i>
                          </DropDown.Item>
                          <DropDown.Item
                            className="dropdown-option"
                            onClick={() => onDelete(date, _id)}
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
          </Fragment>
        );
      })}
    </div>
  );
};
