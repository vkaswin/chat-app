import React, { Fragment, useEffect, useState } from "react";
import { Avatar, Toast } from "components";
import { classNames, handleChat } from "utils";
import { useAuth } from "hooks";
import {
  getFavouriteChats,
  getRecentChats,
  getGroupChats,
} from "services/Chat";
import moment from "moment";
import { socket } from "socket";

import styles from "./Chats.module.scss";

const Chats = () => {
  const { chatId } = useAuth();

  const [chatList, setChatList] = useState({
    recent: [],
    favourite: [],
    group: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  const { favourite, recent, group } = chatList;

  useEffect(() => {
    document.addEventListener("socket", handleSocket);
    getChats();
    return () => {
      document.removeEventListener("socket", handleSocket);
    };
  }, []);

  const handleSocket = () => {
    socket.on("new-message", handleNewMessage);
  };

  const getChats = async () => {
    try {
      let [recent, favourite, group] = await Promise.all([
        await getRecentChats(),
        await getFavouriteChats(),
        await getGroupChats(),
      ]);
      setChatList({
        ...chatList,
        recent: recent.data.data,
        favourite: favourite.data.data,
        group: group.data.data,
      });
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewMessage = (data) => {
    setChatList((prev) => {
      const key = data.type;

      const index = prev[key].findIndex(({ _id }) => {
        return _id === data._id;
      });

      if (index === -1) {
        data.count = 1;
        return { ...prev, [key]: [data] };
      }

      const chats = [...prev[key]];
      let [oldChat] = chats.splice(index, 1);
      data.count = oldChat.count + 1;
      return {
        ...prev,
        [key]: [data, ...chats],
      };
    });
  };

  const getDate = (date) => {
    const isCurrentDate =
      date.split("T")[0] === new Date().toISOString().split("T")[0];

    return isCurrentDate
      ? moment(date).format("h:mm a")
      : moment(date).format("DD/MM/YY");
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.chat_list_container}>
      {favourite.length > 0 && (
        <Fragment>
          <div className={styles.title}>
            <b>Favourites</b>
          </div>
          {favourite.map(
            (
              { _id, count, msg, date, name, avatar, status, userId },
              index
            ) => {
              return (
                <div
                  key={index}
                  className={classNames(styles.user_card, {
                    [styles.active]: _id === chatId,
                  })}
                  onClick={() => handleChat(_id)}
                >
                  <div className={styles.user}>
                    <Avatar
                      src={avatar}
                      name={name}
                      status={status}
                      size={35}
                      userId={userId}
                    />
                    <div className={styles.msg}>
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
      )}
      {recent.length > 0 && (
        <Fragment>
          <div className={styles.title}>
            <b>Recent Chats</b>
          </div>
          {recent.map(
            (
              { _id, count, msg, date, name, avatar, status, userId },
              index
            ) => {
              return (
                <div
                  key={index}
                  className={classNames(styles.user_card, {
                    [styles.active]: _id === chatId,
                  })}
                  onClick={() => handleChat(_id)}
                >
                  <div className={styles.user}>
                    <Avatar
                      src={avatar}
                      name={name}
                      status={status}
                      size={35}
                      userId={userId}
                    />
                    <div className={styles.msg}>
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
      )}
      {group.length > 0 && (
        <Fragment>
          <div className={styles.title}>
            <b>Groups</b>
            <button>
              <i className="bx-plus"></i>
            </button>
          </div>
          {group.map(({ _id, count, msg, date, name, avatar }, index) => {
            return (
              <div
                key={index}
                className={classNames(styles.user_card, {
                  [styles.active]: _id === chatId,
                })}
                onClick={() => handleChat(_id)}
              >
                <div className={styles.user}>
                  <Avatar src={avatar} name={name} size={35} />
                  <div className={styles.msg}>
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
          })}
        </Fragment>
      )}
    </div>
  );
};

export default Chats;
