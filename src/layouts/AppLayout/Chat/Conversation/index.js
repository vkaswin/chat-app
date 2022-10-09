import React, { Fragment } from "react";
import { classNames } from "utils";
import { Reaction } from "./Reaction";
import { Options } from "./Options";
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
  reactions,
  handleReaction,
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
                        {...(key === 0 && index === 0 && { first: "" })}
                        {...(key === chats.length - 1 &&
                          index === messages.length - 1 && { last: "" })}
                      >
                        <div
                          className={styles.chat_card}
                          {...(userId !== id && {
                            id: `reaction-${key}${index}`,
                          })}
                        >
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
                          <Options
                            selector={`#option-${key}${index}`}
                            onCopy={onCopy}
                            onReply={onReply}
                            onDelete={onDelete}
                            date={date}
                            msgId={_id}
                            msg={msg}
                          />
                        </div>
                      </div>
                      {userId !== id && (
                        <Reaction
                          selector={`#reaction-${key}${index}`}
                          reactions={reactions}
                          onClick={() => handleReaction()}
                        />
                      )}
                    </Fragment>
                  );
                }
              )}
            </div>
          </Fragment>
        );
      })}
    </Fragment>
  );
};
