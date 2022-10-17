import React, { useEffect, useState } from "react";
import { Avatar, Modal, Toast } from "components";
import { getSeenByMsgId } from "services/Message";

import styles from "./SeenPopup.module.scss";

const SeenPopup = ({ isOpen, toggle, msgId }) => {
  const [users, setUsers] = useState([]);
  let limit = 25;

  useEffect(() => {
    if (!isOpen) return;
    getUsers(1);
  }, [isOpen, msgId]);

  const getUsers = async (page) => {
    let params = {
      page,
      limit,
    };
    try {
      let {
        data: { data },
      } = await getSeenByMsgId(msgId, params);
      setUsers(data);
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <div className={styles.popup}>
        <div className={styles.reactions}>
          <div className={styles.all}>
            <span>Seen</span>
          </div>
        </div>
        <div className={styles.users}>
          {users.map(({ avatar, email, id, name, status, date }, index) => {
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
