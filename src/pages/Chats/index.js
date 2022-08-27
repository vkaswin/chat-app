import React, { Fragment, useEffect, useRef, useState } from "react";
import { Avatar, Toast } from "components";
import { classNames } from "utils";
import { useAuth, useRouter } from "hooks";
import {
  getFavouriteChats,
  getRecentChats,
  getGroupChats,
} from "services/Chat";
import { socket } from "socket";

import styles from "./Chats.module.scss";

const Chats = () => {
  const router = useRouter();

  const { chatId = null } = router.query;

  const { user } = useAuth();

  const [chatList, setChatList] = useState({
    recent: [],
    favourites: [],
    groups: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  const { favourites, recent, groups } = chatList;

  useEffect(() => {
    if (!socket.io || !user) return;

    socket.io.emit("join-room", user.id);

    socket.io.on("new-message", handleNewMessage);
  }, []);

  useEffect(() => {
    getChats();
  }, []);

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
        favourites: favourite.data.data,
        groups: group.data.data,
      });
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChat = (chatId) => {
    if (!chatId) return;
    router.push(`/chats/${chatId}`);
  };

  const handleNewMessage = (data) => {
    setChatList((prev) => {
      const key = data.type;
      const chats = [...prev[key]];
      const index = chats.findIndex(({ _id }) => {
        return _id === data.chatId;
      });
      const [element] = chats.splice(index, 1);

      element.message = {
        date: data.date,
        msg: data.msg,
        seen: data.seen,
        _id: data._id,
        name: "Aswin",
      };
      element.count += 1;

      return { ...prev, [key]: [element, ...chats] };
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.chat_list_container}>
      {favourites.length > 0 && (
        <Fragment>
          <div className={styles.title}>
            <b>Favourites</b>
          </div>
          {favourites.map(
            (
              {
                _id,
                count,
                message: { msg, date } = {},
                user: { name, avatar, status },
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
                >
                  <div className={styles.user}>
                    <Avatar
                      src={avatar}
                      name={name}
                      status={status}
                      size={35}
                    />
                    <div className={styles.msg}>
                      <span className="truncate-1">{name}</span>
                      <span className="truncate-2">{msg}</span>
                    </div>
                  </div>
                  <div
                    className={classNames(styles.time, {
                      [styles.top]: !count,
                    })}
                  >
                    <span>{date}</span>
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
                message: { msg } = "",
                user: { name, avatar, status },
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
                >
                  <div className={styles.user}>
                    <Avatar
                      src={avatar}
                      name={name}
                      status={status}
                      size={35}
                    />
                    <div className={styles.msg}>
                      <span className="truncate-1">{name}</span>
                      <span className="truncate-2">{msg}</span>
                    </div>
                  </div>
                  <div
                    className={classNames(styles.time, {
                      [styles.top]: !count,
                    })}
                  >
                    <span>12:30 pm</span>
                    {count > 0 && <label>{count}</label>}
                  </div>
                </div>
              );
            }
          )}
        </Fragment>
      )}
      {groups.length > 0 && (
        <Fragment>
          <div className={styles.title}>
            <b>Groups</b>
            <button>
              <i className="bx-plus"></i>
            </button>
          </div>
          {groups.map(
            ({ _id, count, message, group, name = "Loreum Ipsum" }, index) => {
              return (
                <div
                  key={index}
                  className={classNames(styles.user_card, {
                    [styles.active]: _id === chatId,
                  })}
                  onClick={() => handleChat(_id)}
                >
                  <div className={styles.user}>
                    <Avatar name={name} size={35} />
                    <div className={styles.msg}>
                      <span className="truncate-1">{name}</span>
                      <span className="truncate-2">Loreum Ipsum</span>
                    </div>
                  </div>
                  <div
                    className={classNames(styles.time, {
                      [styles.top]: !count,
                    })}
                  >
                    <span>12:30 pm</span>
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
