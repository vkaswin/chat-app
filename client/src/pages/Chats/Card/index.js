import React, { Fragment } from "react";
import { Avatar } from "components";
import { classNames } from "utils";
import moment from "moment";

import styles from "./ChatCard.module.scss";

const ChatCard = ({ title, list, handleClick, type, chatId }) => {
  const getDate = (date) => {
    const isCurrentDate =
      date.split("T")[0] === new Date().toISOString().split("T")[0];

    return isCurrentDate
      ? moment(date).format("h:mm a")
      : moment(date).format("DD/MM/YY");
  };

  return (
    <Fragment>
      <div className={styles.title}>
        <b>{title.padEnd(title.length + 1, "s")}</b>
      </div>
      {list.map(
        (
          { _id, count, msg, date, name, avatar, status, userId, colorCode },
          index
        ) => {
          return (
            <div
              key={index}
              className={classNames(styles.user_card, {
                [styles.active]: _id === chatId,
              })}
              onClick={() => handleClick(_id, type, index)}
              chatid={_id}
            >
              <div className={styles.user}>
                <Avatar
                  src={avatar || colorCode}
                  name={name}
                  status={status}
                  size={35}
                  userId={userId}
                />
                <div className={styles.msg} typingstatus="">
                  <span className="truncate-1">{name}</span>
                  <span className="truncate-1">{msg}</span>
                </div>
              </div>
              <div
                className={classNames(styles.time, {
                  [styles.top]: !count,
                })}
              >
                <span>{getDate(date)}</span>
                {count > 0 && <label>{count}</label>}
              </div>
            </div>
          );
        }
      )}
    </Fragment>
  );
};

export default ChatCard;
