import React from "react";
import { Avatar, Modal } from "components";

import styles from "./SeenPopup.module.scss";

const SeenPopup = ({ isOpen, toggle }) => {
  let users = [];
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <div className={styles.popup}>
        <div className={styles.reactions}>
          <div className={styles.all}>
            <span>Seen</span>
          </div>
        </div>
        <div className={styles.users}>
          {users?.map(({ avatar, email, id, name, status }, index) => {
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

export default SeenPopup;
