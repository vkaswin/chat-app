import React, { Fragment, useEffect, useMemo, useState } from "react";
import { SearchBox, Toast } from "components";
import { useAuth } from "hooks";
import { getChatByType } from "services/Chat";
import { socket } from "socket";
import ChatCard from "./Card";

const types = {
  recent: "recent",
  favourite: "favourite",
  group: "group",
};

const Chats = () => {
  const { chatId, handleChat } = useAuth();

  const [chatList, setChatList] = useState({
    favourite: [],
    recent: [],
    group: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");

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

  const handleClick = (id, type, index) => {
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
            name: group.name,
            avatar: group.avatar,
            colorCode: group.colorCode,
          }
        : {
            ...user,
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

  const handleChange = ({ target: { value } }) => {
    setSearch(value.length === 0 ? "" : value);
  };

  const chats = useMemo(() => {
    if (search.length === 0) return chatList;

    return Object.entries(chatList).reduce((value, [key, chats]) => {
      value[key] = chats.filter(({ name }) => {
        return name.toLowerCase().includes(search.toLocaleLowerCase());
      });
      return value;
    }, {});
  }, [search, chatList]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Fragment>
      <SearchBox
        title="Chats"
        placeholder="Search here..."
        onChange={handleChange}
      />
      {Object.entries(chats).map(([key, value], index) => {
        return (
          <ChatCard
            key={index}
            title={key}
            list={value}
            type={key}
            chatId={chatId}
            handleClick={handleClick}
          />
        );
      })}
    </Fragment>
  );
};

export default Chats;
