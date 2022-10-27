import React, { Fragment, useEffect, useState } from "react";
import { Avatar, SearchBox, Toast } from "components";
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
  const { chatId, handleChat } = useAuth();

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
    socket.on("message", handleMessage);

    socket.on("start-typing", handleStartTyping);

    socket.on("end-typing", handleEndTyping);

    socket.on("favourite", handleFavourite);
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

  const handleClickOnChat = (id, type, index) => {
    clearCount(type, index);
    handleChat(id);
  };

  const clearCount = (type, index) => {
    setChatList((prev) => {
      const chats = { ...prev };
      chats[type][index].count = 0;

      return chats;
    });
  };

  const handleMessage = ({
    message: { msg, date, sender },
    chat: { _id: chatId, group, favourites, user },
    userId,
  }) => {
    let isGroupChat = !!group;

    let message = {
      msg,
      date,
      _id: chatId,
      ...(isGroupChat
        ? {
            group: {
              name: group.name,
              avatar: group.avatar,
              colorCode: group.colorCode,
            },
          }
        : {
            user,
          }),
    };

    setChatList((prev) => {
      let key = isGroupChat
        ? "group"
        : favourites.includes(userId)
        ? "favourite"
        : "recent";

      let index = prev[key].findIndex(({ _id }) => {
        return _id === chatId;
      });

      if (index === -1) {
        message.count = 1;
        return { ...prev, [key]: [message] };
      }

      let chats = [...prev[key]];
      let [oldChat] = chats.splice(index, 1);

      if (
        chatId === sessionStorage.getItem("chatId") ||
        userId === sender._id
      ) {
        message.count = 0;
      } else {
        message.count = (oldChat.count || 0) + 1;
      }
      return {
        ...prev,
        [key]: [message, ...chats],
      };
    });
  };

  const handleFavourite = (data, isFavourite, isGroupChat) => {
    setChatList((prev) => {
      let key = isGroupChat ? "group" : "recent";
      let chats = { ...prev };
      if (isFavourite) {
        chats.favourite.unshift(data);
        let index = chats[key].findIndex(({ _id }) => {
          return data._id === _id;
        });
        if (index < 0) return;
        chats[key].splice(index, 1);
      } else {
        let index = chats.favourite.findIndex(({ _id }) => {
          return data._id === _id;
        });
        if (index < 0) return;
        chats.favourite.splice(index, 1);
      }
      return chats;
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

  const handleChange = ({ taget: { value } }) => {
    console.log(value);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.chat_list_container}>
      <SearchBox
        title="Chats"
        placeholder="Search here..."
        onChange={handleChange}
      />
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
                msg,
                date,
                user: { name, avatar, status, _id: userId, colorCode },
              },
              index
            ) => {
              return (
                <div
                  key={index}
                  className={classNames(styles.user_card, {
                    [styles.active]: _id === chatId,
                  })}
                  onClick={() => handleClickOnChat(_id, types.favourite, index)}
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
                msg,
                date,
                user: { name, avatar, status, id: userId, colorCode },
              },
              index
            ) => {
              return (
                <div
                  key={index}
                  className={classNames(styles.user_card, {
                    [styles.active]: _id === chatId,
                  })}
                  onClick={() => handleClickOnChat(_id, types.recent, index)}
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
              { _id, count, msg, date, group: { name, avatar, colorCode } },
              index
            ) => {
              return (
                <div
                  key={index}
                  className={classNames(styles.user_card, {
                    [styles.active]: _id === chatId,
                  })}
                  onClick={() => handleClickOnChat(_id, types.group, index)}
                  chatid={_id}
                >
                  <div className={styles.user}>
                    <Avatar src={avatar || colorCode} name={name} size={35} />
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
