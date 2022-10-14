import React, { useEffect, useMemo, useRef, useState } from "react";
import { OffCanvas, Toast, ScrollBar } from "components";
import { TextArea } from "./TextArea";
import { Header } from "./Header";
import { Conversation } from "./Conversation";
import { VideoPopup } from "./VideoPopup";
import { useAuth } from "hooks";
import { createMessage } from "services/Message";
import {
  getChatById,
  markAsReadByMsgId,
  markAsRead,
  getChatMessagesByMsgId,
  createReaction,
  updateReaction,
} from "services/Chat";
import { initiateCall } from "services/Call";
import { debounce } from "utils";
import { CSSTransition } from "react-transition-group";
import { socket } from "socket";
import { Loader } from "./Loader";
import { PageLoader } from "./PageLoader";

import messageRingTone from "assets/audio/fade-in-tone.mp3";
import favicon from "assets/images/favicon.ico";

import styles from "./Chat.module.scss";

const audio = new Audio(messageRingTone);

export const Chat = ({ reactions }) => {
  const chatContainerRef = useRef();

  const replyContainerRef = useRef();

  const { user, chatId, clearChatId } = useAuth();

  const peerConnection = useRef();

  const [chats, setChats] = useState([]);

  const [showInfo, setShowInfo] = useState(false);

  const [showVideo, setShowVideo] = useState(false);

  const [replyId, setReplyId] = useState(null);

  const [chatDetails, setChatDetails] = useState({});

  const [topLoader, setTopLoader] = useState(false);

  const [bottomLoader, setBottomLoader] = useState(false);

  const [unReadMsg, setUnReadMsg] = useState({});

  const [pageLoader, setPageLoader] = useState(true);

  const [hasMoreTop, setHasMoreTop] = useState(false);

  const [hasMoreBottom, setHasMoreBottom] = useState(false);

  const msgId = useRef();

  const iceCandidate = useRef();

  const limit = 50;

  useEffect(() => {
    document.addEventListener("socket", handleSocket);
    return () => {
      document.removeEventListener("socket", handleSocket);
    };
  }, []);

  useEffect(() => {
    chats.length !== 0 && setChats([]);
    getChatDetails();
  }, [chatId]);

  useEffect(() => {
    if (!msgId.current || chats.length === 0) return;
    focusMsgById(msgId.current);
  }, [chats]);

  useEffect(() => {
    if (!msgId.current || pageLoader) return;

    focusMsgById(msgId.current);
  }, [pageLoader]);

  const handleSocket = () => {
    socket.on("message", handleMessage);

    socket.on("seen", handleSeen);

    socket.on("receive-offer", handleOffer);

    socket.on("receive-answer", handleAnswer);

    socket.on("start-typing", handleStartTyping);

    socket.on("end-typing", handleEndTyping);
  };

  const handleStartTyping = (chatId, userName) => {
    const id = sessionStorage.getItem("chatId");

    if (!id) return;

    if (chatId !== id || !chatContainerRef.current) return;

    const element = chatContainerRef.current.querySelector("[typingstatus]");

    if (!element) return;

    element.setAttribute("typing", `${userName.split(" ")[0]} is typing...`);
  };

  const handleEndTyping = (chatId) => {
    const id = sessionStorage.getItem("chatId");

    if (!id) return;

    if (chatId !== id || !chatContainerRef.current) return;

    const element = chatContainerRef.current.querySelector("[typingstatus]");

    if (!element) return;

    element.removeAttribute("typing");
  };

  //   Profile
  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  //   Chats
  const getChatDetails = async () => {
    setPageLoader(true);
    try {
      let {
        data: {
          data: {
            chatDetails = {},
            unReadMsgList = [],
            msgList = [],
            hasMoreTop = false,
            hasMoreBottom = false,
            totalUnReadMsg = 0,
          },
        },
      } = await getChatById(chatId, { limit });
      if (unReadMsgList.length > 0) {
        msgId.current = unReadMsgList[0].messages[0]._id;
        pushMessagesInChat(msgList, unReadMsgList);
        setUnReadMsg({ id: msgId.current, total: totalUnReadMsg });
        setHasMoreBottom(hasMoreBottom);
        await markAsRead(chatId);
      } else {
        if (msgList.length > 0) {
          msgId.current = msgList.at(-1).messages.at(-1)._id;
        }
      }
      setChatDetails(chatDetails);
      setChats(msgList);
      setHasMoreTop(hasMoreTop);
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    } finally {
      setPageLoader(false);
    }
  };

  const getMessages = async (msgId, latest) => {
    try {
      let {
        data: {
          data: { list, hasMore },
        },
      } = await getChatMessagesByMsgId(chatId, msgId, { limit, latest });
      let chat = [...chats];
      latest
        ? pushMessagesInChat(chat, list)
        : unShiftMessagesInChat(chat, list.reverse());
      setChats(chat);
      latest ? setHasMoreBottom(hasMore) : setHasMoreTop(hasMore);
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    } finally {
      latest ? setBottomLoader(false) : setTopLoader(false);
    }
  };

  const unShiftMessagesInChat = (chats, list) => {
    list.forEach(({ day, messages }, i) => {
      let index = chats.findIndex(({ day: key }) => {
        return day === key;
      });
      index === -1
        ? chats.unshift({ day, messages })
        : chats[index].messages.unshift(...messages);

      if (i === 0) {
        msgId.current = messages[messages.length - 1]._id;
      }
    });
  };

  const pushMessagesInChat = (chats, list) => {
    list.forEach(({ day, messages }, i) => {
      let index = chats.findIndex(({ day: key }) => {
        return day === getDate(key);
      });
      index === -1
        ? chats.push({ day, messages })
        : chats[index].messages.push(...messages);
      if (i === 0) {
        msgId.current = list[0].messages[0]._id;
      }
    });
  };

  const addMessageInChat = (chats, messages, day) => {
    let index = chats.findIndex(({ day: key }) => {
      return day === key;
    });

    index === -1
      ? chats.push({ day, messages: [messages] })
      : chats[index].messages.push(messages);
  };

  const updateSeenStatus = async (msgId) => {
    if (!chatId) return;

    try {
      await markAsReadByMsgId(chatId, msgId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = ({
    target: { scrollTop, scrollHeight, clientHeight },
  }) => {
    if (pageLoader || topLoader || bottomLoader) return;

    if (hasMoreTop && scrollTop === 0) {
      const msgId = chatContainerRef.current
        .querySelector("[first]")
        .getAttribute("msgid");
      setTopLoader(true);
      getMessages(msgId, 0);
    }

    if (hasMoreBottom && scrollHeight - scrollTop === clientHeight) {
      const msgId = chatContainerRef.current
        .querySelector("[last]")
        .getAttribute("msgid");
      setBottomLoader(true);
      getMessages(msgId, 1);
    }
  };

  const onSend = async (msg) => {
    try {
      let body = {
        msg: msg,
        date: new Date().toISOString(),
        ...(replyId && { reply: replyId }),
      };
      await createMessage(chatId, body);
      replyId && clearReplyMsg();
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    }
  };

  const onDelete = (date, id) => {
    const key = getDate(date);

    if (!chats.hasOwnProperty(key)) return;

    const data = chats[key].filter(({ _id }) => id !== _id);

    setChats({ ...chats, [key]: data });
  };

  //   Copy Msg
  const onCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  //   Reply Msg
  const onReply = (date, id) => {
    const key = getDate(date);
    setReplyId({ key, id });
  };

  const clearReplyMsg = () => {
    setReplyId(null);
  };

  const focusMsgById = (id = msgId.current || null, behavior = "auto") => {
    if (!id) return;

    const element = document.querySelector(`[msgid='${id}']`);

    if (!element) return;

    element.scrollIntoView({ block: "center", behavior });
  };

  const replyMsg = useMemo(() => {
    return null;
    // return chats.find(({ _id }) => replyId === _id);
  }, [replyId]);

  const handleMessage = ({ message, chat, userId }) => {
    setChats((prev) => {
      showNotification(message.msg);
      playMessageRingTone();
      let chats = [...prev];
      addMessageInChat(chats, message, getDate(message.date));
      msgId.current = message._id;
      message.sender.id !== userId &&
        sessionStorage.getItem("chatId") === chat._id &&
        updateSeenStatus(message._id);
      return chats;
    });
  };

  const handleSeen = ({ userId, msgId }) => {
    if (user?.id === userId) return;

    const markAsSeen = (id) => {
      const element = document.querySelector(`[msgid='${id}']`);

      if (!element) return;

      const ele = element.querySelector("[seen]");
      ele.setAttribute("seen", true);
    };

    if (!Array.isArray(msgId)) {
      markAsSeen(msgId);
      return;
    }

    msgId.forEach(({ id }) => {
      markAsSeen(id);
    });
  };

  const handleReaction = async (emoji, reactions, msgId) => {
    let reaction;

    for (const [index, { users }] of reactions.entries()) {
      reaction = users.find(({ id }, ind) => {
        return user.id === id;
      });
      if (reaction) break;
    }

    reaction
      ? handleUpdateReaction({
          reaction: emoji,
          id: reaction.reactionId,
        })
      : handleCreateReaction({ reaction: emoji, msgId });
  };

  const handleCreateReaction = async (data) => {
    try {
      let res = await createReaction(data);
      console.log(res);
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    }
  };

  const handleUpdateReaction = async (data) => {
    try {
      let res = await updateReaction(data);
      console.log(res);
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    }
  };

  const findMsgByMsgId = (msgId) => {
    let message;
    for (let { messages } of chats) {
      message = messages.find(({ _id }) => {
        return _id === msgId;
      });
      if (message) break;
    }
    if (message) return message;
  };

  // Ringtone
  const playMessageRingTone = () => {
    audio.muted = false;
    audio.play();
  };

  // Notification
  const showNotification = async (body) => {
    if (Notification.permission !== "granted") return;

    new Notification("New Message", {
      body,
      icon: favicon,
    });
  };

  const handleFocus = () => {
    const { matches } = matchMedia(`(max-width: 768px)`);

    if (!matches) return;

    focusMsgById();
  };

  const getDate = (date) => {
    return date.split("T")[0];
  };

  //   Video Call
  const handleCall = async (type) => {
    setShowVideo(true);

    try {
      peerConnection.current = new RTCPeerConnection();

      peerConnection.current.onicecandidate = handleIceCandidate;
      peerConnection.current.ontrack = handleTrack;

      let localStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
        video: true,
      });
      let localVideo = document.querySelector("#local-stream");
      localVideo.srcObject = localStream;
      localStream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, localStream);
      });
      let offer = await peerConnection.current.createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1,
      });

      await peerConnection.current.setLocalDescription(offer);

      const data = { date: new Date().toISOString(), offer, type };

      await initiateCall(chatId, data);
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    }
  };

  const handleTrack = ({ streams: [remoteStream] }) => {
    let remoteVideo = document.querySelector("#remote-stream");
    remoteVideo.srcObject = remoteStream;
  };

  const handleIceCandidate = (e) => {
    const {
      target: { localDescription },
      candidate,
    } = e;
    if (candidate) {
      iceCandidate.current = candidate;
    }

    if (!candidate || !iceCandidate.current) {
      if (localDescription.type === "offer") {
        let data = {
          offer: localDescription,
          iceCandidate: iceCandidate.current,
        };
        socket.emit("send-offer", data, chatId);
      } else if (localDescription.type === "answer") {
        let data = {
          answer: localDescription,
          iceCandidate: iceCandidate.current,
        };
        socket.emit("send-answer", data, chatId);
      }
    }
  };

  const handleOffer = async ({ iceCandidate, offer }) => {
    setShowVideo(true);

    const pc = new RTCPeerConnection();
    peerConnection.current = pc;

    peerConnection.current.onicecandidate = handleIceCandidate;
    peerConnection.current.ontrack = handleTrack;

    try {
      let localStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
        video: true,
      });
      let localVideo = document.querySelector("#local-stream");
      localVideo.srcObject = localStream;
      localStream.getTracks().forEach((track) => {
        peerConnection.current.addTrack(track, localStream);
      });
      await peerConnection.current.setRemoteDescription(offer);
      await peerConnection.current.addIceCandidate(iceCandidate);
      let answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAnswer = async ({ iceCandidate, answer }) => {
    try {
      await peerConnection.current.setRemoteDescription(answer);
      await peerConnection.current.addIceCandidate(iceCandidate);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      ref={chatContainerRef}
      className={styles.chat_wrapper}
      onScroll={debounce(handleScroll, 100)}
    >
      <Header
        clearChatId={clearChatId}
        chatDetails={chatDetails}
        handleCall={handleCall}
        toggleInfo={toggleInfo}
        show={!!chatId}
      />
      {topLoader && <Loader />}
      <div id="conversation" className={styles.chat_section}>
        {pageLoader ? (
          <PageLoader />
        ) : (
          <Conversation
            chats={chats}
            onDelete={onDelete}
            onCopy={onCopy}
            onReply={onReply}
            userId={user?.id}
            otherUserId={chatDetails?.userId || chatDetails?.users}
            focusMsgById={focusMsgById}
            chatId={chatId}
            unReadMsg={unReadMsg}
            isGroupChat={!!chatDetails?.group}
            reactionList={reactions}
            handleReaction={handleReaction}
            findMsgByMsgId={findMsgByMsgId}
          />
        )}
      </div>
      <div className={styles.typing} typingstatus=""></div>
      {bottomLoader && <Loader />}
      <TextArea
        onSend={onSend}
        onFocus={handleFocus}
        chatId={chatId}
        otherUser={
          chatDetails?.userId
            ? { id: chatDetails?.userId, name: chatDetails?.name }
            : chatDetails?.users
        }
      />
      <CSSTransition
        in={Boolean(replyId)}
        timeout={250}
        classNames={{
          enterActive: styles.reply_enter,
          exitActive: styles.reply_exit,
        }}
        unmountOnExit
      >
        <div className={styles.reply_container} ref={replyContainerRef}>
          <div className={styles.reply_card}>
            <span className="truncate-4">{replyMsg?.msg}</span>
            <i className={`bx-x ${styles.close}`} onClick={clearReplyMsg}></i>
          </div>
        </div>
      </CSSTransition>
      <OffCanvas
        isOpen={showInfo}
        position="right"
        className={styles.profile_sidebar}
        toggle={toggleInfo}
        zIndex={2001}
      >
        <div>Hello</div>
      </OffCanvas>
      <VideoPopup isOpen={showVideo} />
    </div>
  );
};

/*  bx bx-microphone
  bx bx-video
  bx-exit-fullscreen
  bx-fullscreen
  bxs-phone-call
  bxs-phone
  bx-cast
  bx-stop
  bx-pin bxs-pin */
