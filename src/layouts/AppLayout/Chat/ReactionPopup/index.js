import React, { useEffect, useState } from "react";
import { Avatar, Modal } from "components";
import { getReactionUrl } from "utils";
import { getReactions, getReactionsByType } from "services/Message";

import styles from "./ReactionPopup.module.scss";

const ReactionPopup = ({ isOpen, toggle, msgId }) => {
  const [reactions, setReactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [type, setType] = useState();

  let limit = 25;

  useEffect(() => {
    if (!isOpen) return;
    getReaction();
  }, [isOpen]);

  const getReaction = async () => {
    let params = {
      page: 1,
      limit,
    };
    try {
      let [
        {
          data: { data: reaction },
        },
        {
          data: { data: list },
        },
      ] = await Promise.all([
        getReactions(msgId),
        getReactionsByType(msgId, params),
      ]);
      setReactions(reaction);
      setUsers(list);
    } catch (error) {
      console.log(error);
    }
  };

  const getReactionList = async (reaction) => {
    let params = {
      page: 1,
      limit,
      type: reaction,
    };
    try {
      let {
        data: { data },
      } = await getReactionsByType(msgId, params);
      setType(reaction);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <div className={styles.popup}>
        <div className={styles.reactions}>
          <div className={styles.all} onClick={() => getReactionList()}>
            <span>All</span>
          </div>
          {reactions?.map(({ reaction, total }, index) => {
            return (
              <div
                key={index}
                className={styles.card}
                onClick={() => getReactionList(reaction)}
              >
                <img src={getReactionUrl(reaction)} />
                <span>{total}</span>
              </div>
            );
          })}
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

export default ReactionPopup;
