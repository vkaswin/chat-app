import React from "react";
import chatList from "data/user.json";

import styles from "./Chats.module.scss";
import { Avatar } from "components";
import { classNames } from "utils";

const Chats = () => {
  const { favourites, users, channels } = chatList;
  console.log(favourites, users, channels);
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
          >
            <div className={styles.user}>
              <Avatar src={profile} userName={name} status={status} size={35} />
              <span>{name}</span>
            </div>
            {messagecount && <label>{messagecount}</label>}
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
          >
            <div className={styles.user}>
              <Avatar src={profile} userName={name} status={status} size={35} />
              <span>{name}</span>
            </div>
            {messagecount && <label>{messagecount}</label>}
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
          >
            <div className={styles.user}>
              <span>#</span>
              <span>{name}</span>
            </div>
            {messagecount && <label>{messagecount}</label>}{" "}
          </div>
        );
      })}
    </div>
  );
};

export default Chats;
