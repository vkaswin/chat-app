import React, { useEffect, useState } from "react";
import { Avatar, Modal, Toast } from "components";
import { getReactionUrl } from "utils";
import { getReactions, getReactionsByType } from "services/Message";

import styles from "./ReactionPopup.module.scss";

const ReactionPopup = ({ msgId, clearMsgId }) => {
  const [reactions, setReactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [type, setType] = useState();
  const [isOpen, setIsOpen] = useState(false);

  let limit = 25;

  useEffect(() => {
    if (!msgId) return;
    getReaction();
  }, [msgId]);

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
      Toast({ type: "error", message: error?.message });
    } finally {
      setIsOpen(true);
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
      Toast({ type: "error", message: error?.message });
    }
  };

  const toggle = () => {
    clearMsgId();
    setIsOpen(false);
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
                <img src={getReactionUrl(reaction)} loading="lazy" alt="" />
                <span>{total}</span>
              </div>
            );
          })}
        </div>
        <div className={styles.users}>
          {users.map(
            ({ avatar, email, id, name, status, date, colorCode }, index) => {
              return (
                <div key={index} className={styles.card}>
                  <Avatar
                    name={name}
                    size={40}
                    status={status}
                    userId={id}
                    src={avatar || colorCode}
                  />
                  <span>{name}</span>
                </div>
              );
            }
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ReactionPopup;
