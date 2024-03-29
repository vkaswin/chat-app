import React, { Fragment, useEffect, useState } from "react";
import { classNames, getReactionUrl } from "utils";
import { Reaction } from "./Reaction";
import { Options } from "./Options";
import moment from "moment";

import styles from "./Conversation.module.scss";
import ReactionPopup from "./ReactionPopup";
import SeenPopup from "./SeenPopup";

export const Conversation = ({
  chats,
  onDelete,
  onCopy,
  onReply,
  userId,
  focusMsgById,
  unReadMsg,
  isGroupChat,
  reactionList,
  handleReaction,
}) => {
  let [reactionMsgId, setReactionMsgId] = useState();
  let [seenMsgId, setSeenMsgId] = useState();

  return (
    <Fragment>
      {chats.map(({ day, messages }, key) => {
        return (
          <Fragment key={key}>
            <div className={styles.date}>
              <span>{moment(day).format("D MMMM YYYY")}</span>
            </div>
            <div className={styles.container} index={key}>
              {messages.map((message, index) => {
                let {
                  msg,
                  date,
                  sender: { id: senderId, name, avatar, colorCode } = {},
                  _id,
                  seen,
                  reply = null,
                  reactions,
                  totalReactions,
                } = message;

                return (
                  <Fragment key={_id}>
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
                        [styles.end]: userId === senderId,
                      })}
                      msgid={_id}
                      {...(key === 0 && index === 0 && { first: "" })}
                      {...(key === chats.length - 1 &&
                        index === messages.length - 1 && { last: "" })}
                    >
                      <div>
                        <div className={styles.chat_card}>
                          {reply && (
                            <div
                              className={styles.reply_card}
                              onClick={() => focusMsgById(_id, "smooth", reply)}
                            >
                              <span>{reply.msg}</span>
                            </div>
                          )}
                          <div id={`reaction-${_id}`}>
                            {isGroupChat && senderId !== userId && (
                              <span
                                style={{ color: colorCode }}
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
                            {userId === senderId && (
                              <i
                                className={`bx bx-check-double ${styles.tick}`}
                                seen={seen.toString()}
                                onClick={() => setSeenMsgId(_id)}
                              ></i>
                            )}
                          </div>
                        </div>
                        <div className={styles.options}>
                          <i
                            className="bx-dots-vertical-rounded"
                            id={`option-${_id}`}
                          ></i>
                        </div>
                      </div>
                      {totalReactions > 0 && (
                        <div
                          className={styles.reactions}
                          onClick={() => setReactionMsgId(_id)}
                        >
                          {Object.keys(reactions).map((reaction, ind) => {
                            return (
                              <img
                                key={ind}
                                src={getReactionUrl(reaction)}
                                loading="lazy"
                                alt=""
                              />
                            );
                          })}
                          <span>{totalReactions}</span>
                        </div>
                      )}
                    </div>
                    <Options
                      selector={`#option-${_id}`}
                      onCopy={onCopy}
                      onReply={() => onReply(message)}
                      onDelete={onDelete}
                      date={date}
                      msgId={_id}
                      msg={msg}
                    />
                    <Reaction
                      selector={`#reaction-${_id}`}
                      reactions={reactionList}
                      onClick={(reaction) => handleReaction(reaction, _id, key)}
                    />
                  </Fragment>
                );
              })}
            </div>
          </Fragment>
        );
      })}
      <ReactionPopup msgId={reactionMsgId} clearMsgId={setReactionMsgId} />
      <SeenPopup msgId={seenMsgId} clearMsgId={setSeenMsgId} />
    </Fragment>
  );
};
