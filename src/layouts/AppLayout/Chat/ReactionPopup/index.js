import React, { useMemo, useState } from "react";
import { Avatar, Modal } from "components";
import { getReactionUrl } from "utils";

import styles from "./ReactionPopup.module.scss";

const ReactionPopup = ({ isOpen, toggle, message }) => {
  let [activeIndex, setActiveIndex] = useState();

  const reaction = useMemo(() => {
    if (!message.hasOwnProperty("reactions")) return [];
    return activeIndex === 0 || activeIndex
      ? message.reactions[activeIndex].users
      : message.reactions.reduce((initial, { users }) => {
          return initial.concat(users);
        }, []);
  }, [activeIndex, message]);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <div className={styles.popup}>
        <div className={styles.reactions}>
          <div className={styles.all} onClick={() => setActiveIndex()}>
            <span>All</span>
          </div>
          {message?.reactions?.map(({ reaction, total }, index) => {
            return (
              <div
                key={index}
                className={styles.card}
                onClick={() => setActiveIndex(index)}
              >
                <img src={getReactionUrl(reaction)} />
                <span>{total}</span>
              </div>
            );
          })}
        </div>
        <div className={styles.users}>
          {reaction.map(({ avatar, email, id, name, status }, index) => {
            return (
              <div key={index} className={styles.card}>
                <Avatar
                  name={name}
                  size={40}
                  status={status}
                  userId={id}
                  src={avatar}
                />
                <span>{name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default ReactionPopup;
