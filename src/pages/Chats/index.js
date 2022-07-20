import React from "react";
import { Avatar } from "components";
import { classNames } from "utils";
import { useRouter } from "hooks";
import chatList from "data/user.json";

import styles from "./Chats.module.scss";

const Chats = () => {
  const router = useRouter();

  const { favourites, users, channels } = chatList;

  const handleChat =
    (userId = "4254") =>
    () => {
      const { matches } = window.matchMedia(`(max-width: 768px)`);
      if (matches) {
        router.push(`/conversation?userId${userId}`);
      } else {
        router.push({ search: `?userId=${userId}` });
      }
    };

  return (
    <div className={styles.chat_list_container}>
      <div className={styles.title}>
        <b>Favourites</b>
      </div>
      {favourites.map(({ messagecount, name, profile, status }, index) => {
        return (
          <div
            key={index}
            className={classNames(styles.user_card, {
              [styles.active]: index === 0,
            })}
            onClick={handleChat()}
          >
            <div className={styles.user}>
              <Avatar src={profile} userName={name} status={status} size={35} />
              <div className={styles.msg}>
                <span className="truncate-1">{name}</span>
                <span>Loreum Ipsum</span>
              </div>
            </div>
            <div
              className={classNames(styles.time, {
                [styles.top]: !messagecount,
              })}
            >
              <span>12:30 pm</span>
              {messagecount && <label>{10}</label>}
            </div>
          </div>
        );
      })}
      <div className={styles.title}>
        <b>Recent Chats</b>
      </div>
      {users.map(({ messagecount, name, profile, status }, index) => {
        return (
          <div
            key={index}
            className={classNames(styles.user_card, {
              [styles.active]: false,
            })}
            onClick={handleChat}
          >
            <div className={styles.user}>
              <Avatar src={profile} userName={name} status={status} size={35} />
              <div className={styles.msg}>
                <span className="truncate-1">{name}</span>
                <span>Loreum Ipsum</span>
              </div>
            </div>
            <div
              className={classNames(styles.time, {
                [styles.top]: !messagecount,
              })}
            >
              <span>12:30 pm</span>
              {messagecount && <label>{messagecount}</label>}
            </div>
          </div>
        );
      })}
      <div className={styles.title}>
        <b>Channels</b>
        <button>
          <i className="bx-plus"></i>
        </button>
      </div>
      {channels.map(({ messagecount, name }, index) => {
        return (
          <div
            key={index}
            className={classNames(styles.user_card, {
              [styles.active]: false,
            })}
            onClick={handleChat}
          >
            <div className={styles.user}>
              <Avatar userName={name} size={35} />
              <div className={styles.msg}>
                <span className="truncate-1">{name}</span>
                <span>Loreum Ipsum</span>
              </div>
            </div>
            <div
              className={classNames(styles.time, {
                [styles.top]: !messagecount,
              })}
            >
              <span>12:30 pm</span>
              {messagecount && <label>{messagecount}</label>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chats;
