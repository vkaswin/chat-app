import React, { Fragment } from "react";
import { DropDown, DropDownItem } from "components";
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
  otherUserId,
  unReadMsg,
  isGroupChat,
}) => {
  return (
    <Fragment>
      {chats.map(({ day, messages }, key) => {
        return (
          <Fragment key={key}>
            <div className={styles.date}>
              <span>{moment(day).format("D MMMM YYYY")}</span>
            </div>
            <div className={styles.container}>
              {messages.map(
                (
                  {
                    msg,
                    date,
                    sender: { id = null, name = null, avatar = null } = {},
                    _id,
                    seen,
                    reply = null,
                  },
                  index
                ) => {
                  return (
                    <Fragment key={index}>
                      {unReadMsg.id && unReadMsg.id === _id && (
                        <div className={styles.unread_msg}>
                          <span>
                            {unReadMsg.total} Unread Message
                            {unReadMsg.total > 1 && "s"}
                          </span>
                        </div>
                      )}
                      <div
                        className={classNames(styles.chat_wrapper, {
                          [styles.end]: userId === id,
                        })}
                        msgid={_id}
                      >
                        <div className={styles.chat_card}>
                          {reply && (
                            <div
                              className={styles.reply_card}
                              onClick={() => focusMsgById(reply._id, "smooth")}
                            >
                              <span>{reply.msg}</span>
                            </div>
                          )}
                          <div>
                            {isGroupChat && id !== userId && (
                              <span
                                style={{ color: avatar }}
                                className={styles.user_name}
                              >
                                {name.split(" ")[0]}
                              </span>
                            )}
                            <span>{msg}</span>
                          </div>
                          <div className={styles.msg_time}>
                            <i className={`bx-time ${styles.clock}`}></i>
                            <span>
                              {moment(new Date(date)).format("h:mm a")}
                            </span>
                            <i
                              className={`bx bx-check-double ${styles.tick}`}
                              seen={
                                Array.isArray(otherUserId)
                                  ? (
                                      seen.length === otherUserId.length
                                    ).toString()
                                  : seen.includes(otherUserId).toString()
                              }
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
                            <DropDownItem
                              className="dropdown-option"
                              onClick={() => onReply(date, _id)}
                            >
                              <span>Reply</span>
                              <i className="bx-share"></i>
                            </DropDownItem>
                            <DropDownItem className="dropdown-option">
                              <span>Forward</span>
                              <i className="bx-share-alt"></i>
                            </DropDownItem>
                            <DropDownItem
                              className="dropdown-option"
                              onClick={() => onCopy(msg)}
                            >
                              <span>Copy</span>
                              <i className="bx-copy"></i>
                            </DropDownItem>
                            <DropDownItem className="dropdown-option">
                              <span>Mark as Unread</span>
                              <i className="bx-message-error"></i>
                            </DropDownItem>
                            <DropDownItem
                              className="dropdown-option"
                              onClick={() => onDelete(date, _id)}
                            >
                              <span>Delete</span>
                              <i className="bx-trash"></i>
                            </DropDownItem>
                          </DropDown>
                        </div>
                      </div>
                    </Fragment>
                  );
                }
              )}
            </div>
          </Fragment>
        );
      })}
      <div className={styles.typing} typingstatus=""></div>
    </Fragment>
  );
};
