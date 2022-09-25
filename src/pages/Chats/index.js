import React, { Fragment, useEffect, useState } from "react";
import { Avatar, Toast } from "components";
import { classNames } from "utils";
import { useAuth } from "hooks";
import { getChatByType } from "services/Chat";
import moment from "moment";
import { socket } from "socket";

import styles from "./Chats.module.scss";

const types = {
  recent: "recent",
  favourite: "favourite",
  group: "group",
};

const Chats = () => {
  const { chatId, handleChat, user } = useAuth();

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

    socket.on("start-typing", handleStartTyping);

    socket.on("end-typing", handleEndTyping);
  };

  const getChats = async () => {
    try {
      let [recent, favourite, group] = await Promise.all([
        getChatByType(types.recent),
        getChatByType(types.favourite),
        getChatByType(types.group),
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

  const handleNewMessage = (data, senderId, userId) => {
    const chatId = sessionStorage.getItem("chatId");

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

      if (chatId === data._id || userId === senderId) {
        data.count = 0;
      } else {
        data.count = oldChat.count + 1;
      }
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

  const handleStartTyping = (chatId, userName) => {
    const element = document.querySelector(`[chatid='${chatId}']`);

    if (!element) return;

    element
      .querySelector("[typingstatus]")
      .setAttribute("typing", `${userName.split(" ")[0]} is typing...`);
  };

  const handleEndTyping = (chatId) => {
    const element = document.querySelector(`[chatid='${chatId}']`);

    if (!element) return;

    element.querySelector("[typingstatus]").removeAttribute("typing");
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
              {
                _id,
                count,
                latest: { msg, date },
                user: { name, avatar, status, id },
              },
              index
            ) => {
              return (
                <div
                  key={index}
                  className={classNames(styles.user_card, {
                    [styles.active]: _id === chatId,
                  })}
                  onClick={() => handleChat(_id)}
                  chatid={_id}
                >
                  <div className={styles.user}>
                    <Avatar
                      src={avatar}
                      name={name}
                      status={status}
                      size={35}
                      userId={id}
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
      )}
      {recent.length > 0 && (
        <Fragment>
          <div className={styles.title}>
            <b>Recent Chats</b>
          </div>
          {recent.map(
            (
              {
                _id,
                count,
                latest: { msg, date },
                user: { name, avatar, status, id },
              },
              index
            ) => {
              return (
                <div
                  key={index}
                  className={classNames(styles.user_card, {
                    [styles.active]: _id === chatId,
                  })}
                  onClick={() => handleChat(_id)}
                  chatid={_id}
                >
                  <div className={styles.user}>
                    <Avatar
                      src={avatar}
                      name={name}
                      status={status}
                      size={35}
                      userId={id}
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
      )}
      {group.length > 0 && (
        <Fragment>
          <div className={styles.title}>
            <b>Groups</b>
            <button>
              <i className="bx-plus"></i>
            </button>
          </div>
          {group.map(
            (
              { _id, count, latest: { msg, date }, group: { name, avatar } },
              index
            ) => {
              return (
                <div
                  key={index}
                  className={classNames(styles.user_card, {
                    [styles.active]: _id === chatId,
                  })}
                  onClick={() => handleChat(_id)}
                  chatid={_id}
                >
                  <div className={styles.user}>
                    <Avatar src={avatar} name={name} size={35} />
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
      )}
    </div>
  );
};

export default Chats;
