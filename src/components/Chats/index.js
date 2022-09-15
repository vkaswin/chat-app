import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { DropDown, Avatar, OffCanvas, Toast, ScrollBar } from "components";
import { TextArea } from "./TextArea";
import { Conversation } from "./Conversation";
import { VideoPopup } from "./VideoPopup";
import { useAuth, useRouter } from "hooks";
import { createMessage, getMessagesByChatId } from "services/Message";
import { getChatById, markAsRead } from "services/Chat";
import { initiateCall } from "services/Call";
import { classNames, debounce } from "utils";
import { CSSTransition } from "react-transition-group";
import { socket } from "socket";

import messageRingTone from "assets/audio/fade-in-tone.mp3";
import favicon from "assets/images/favicon.ico";

import styles from "./Chats.module.scss";

const audio = new Audio(messageRingTone);

export const Chats = () => {
  const { matches } = matchMedia(`(max-width: 768px)`);

  const chatContainerRef = useRef();

  const replyContainerRef = useRef();

  const { user, chatId, clearChatId } = useAuth();

  const peerConnection = useRef();

  const [chats, setChats] = useState({});

  const [showInfo, setShowInfo] = useState(false);

  const [showVideo, setShowVideo] = useState(false);

  const [replyId, setReplyId] = useState(null);

  const [pageMeta, setPageMeta] = useState({});

  const [chatDetails, setChatDetails] = useState({});

  const [newMsg, setNewMsg] = useState({ id: null, count: null, list: [] });

  const [loading, setLoading] = useState(false);

  const [pageLoader, setPageLoader] = useState(true);

  const msgId = useRef();

  const limit = 30;

  let iceCandidate;

  useEffect(() => {
    document.addEventListener("socket", handleSocket);
    return () => {
      document.removeEventListener("socket", handleSocket);
    };
  }, []);

  useEffect(() => {
    Object.keys(chats).length !== 0 && setChats({});
    getChatDetails();
  }, [chatId]);

  useEffect(() => {
    if (newMsg.list.length > 0) {
      const msgId = newMsg.list.map(({ _id }) => {
        return _id;
      });
      updateSeenStatus({ msgId });
    }

    if (!msgId.current || Object.keys(chats).length === 0) return;

    focusMsgById(msgId.current);
  }, [chats]);

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
    let params = {
      page: 1,
      limit,
    };
    try {
      let [
        {
          data: { data },
        },
        {
          data: {
            data: { list, newMessages, pageMeta },
          },
        },
      ] = await Promise.all([
        getChatById(chatId),
        getMessagesByChatId(chatId, params),
      ]);
      setChatDetails(data);
      groupMessagesByDate(list, newMessages, pageMeta);
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    } finally {
      setPageLoader(false);
    }
  };

  const getMessages = async (page) => {
    try {
      let params = {
        limit,
        page,
      };
      let {
        data: {
          data: { list, newMessages, pageMeta },
        },
      } = await getMessagesByChatId(chatId, params);
      groupMessagesByDate(list, newMessages, pageMeta);
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    } finally {
      setLoading(false);
    }
  };

  const groupMessagesByDate = (list, newMessages = [], pageMeta) => {
    if (list.length === 0 && newMessages.length === 0) return;

    if (newMessages.length > 0) {
      let id = newMessages[0]?._id;
      msgId.current = id;
      list = list.concat(newMessages);
      setNewMsg({
        ...newMsg,
        id,
        count: newMessages.length,
        list: newMessages,
      });
    } else {
      msgId.current = list[list.length - 1]?._id;
    }

    const chatsByDate = list.reduce((initial, msg) => {
      const key = getDate(msg.date);
      return initial.hasOwnProperty(key)
        ? {
            ...initial,
            [key]: [...initial[key], msg],
          }
        : { ...initial, [key]: [msg] };
    }, {});

    if (Object.keys(chatsByDate).length === 0) return;

    setChats((prev) => {
      const final = Object.entries(chatsByDate).reduce(
        (initial, [date, msg]) => {
          const key = getDate(date);
          return initial.hasOwnProperty(key)
            ? {
                ...initial,
                [key]: [...initial[key], ...msg].sort((a, b) => {
                  return new Date(a.date) - new Date(b.date);
                }),
              }
            : { ...initial, [key]: msg };
        },
        prev
      );

      const sortByDate = Object.keys(final).sort((a, b) => {
        return new Date(a) - new Date(b);
      });

      return sortByDate.reduce((initial, date) => {
        return { ...initial, [date]: final[date] };
      }, {});
    });

    setPageMeta(pageMeta);
  };

  const updateSeenStatus = async (data) => {
    if (!chatId) return;

    try {
      await markAsRead(chatId, data);
      setNewMsg({ ...newMsg, list: [] });
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = ({ target: { scrollTop } }) => {
    const { page, totalPages } = pageMeta;

    if (scrollTop !== 0 || page >= totalPages) return;

    setLoading(true);
    setTimeout(() => getMessages(page + 1), 500);
  };

  const onSend = async (msg) => {
    try {
      let body = {
        msg: msg,
        date: new Date().toISOString(),
        ...(replyId && { reply: replyId }),
      };
      let {
        data: { data },
      } = await createMessage(chatId, body);
      addMessageInChat(data);
      replyId && clearReplyMsg();
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    }
  };

  const addMessageInChat = (data) => {
    const key = getDate(data.date);
    msgId.current = data._id;

    setChats((prev) => {
      return prev.hasOwnProperty(key)
        ? { ...prev, [key]: [...prev[key], data] }
        : { ...prev, [key]: [data] };
    });
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

  const handleMessage = (data) => {
    if (data.sender === user?.id) return;

    showNotification(data.msg);
    playMessageRingTone();
    addMessageInChat(data);
    updateSeenStatus({ msgId: data._id });
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

    msgId.forEach((id) => {
      markAsSeen(id);
    });
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
      iceCandidate = candidate;
    }

    if (!candidate || !iceCandidate) {
      if (localDescription.type === "offer") {
        let data = {
          offer: localDescription,
          iceCandidate,
        };
        socket.emit("send-offer", data, chatId);
      } else if (localDescription.type === "answer") {
        let data = {
          answer: localDescription,
          iceCandidate,
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
      className={classNames(styles.chat_wrapper, { [styles.show]: !!chatId })}
      onScroll={debounce(handleScroll, 100)}
    >
      <div className={styles.chat_header}>
        <div className={styles.user_info}>
          <div className={styles.go_back} onClick={clearChatId}>
            <i className="bx bx-chevron-left"></i>
          </div>
          <Avatar
            src={chatDetails?.avatar}
            name={chatDetails?.name}
            size={50}
            status={chatDetails?.status}
            userId={chatDetails?.userId}
          />
          <div className={styles.user_name}>
            <b>{chatDetails?.name}</b>
            <span userid={chatDetails?.userId}>
              {chatDetails?.users
                ? `${chatDetails?.users?.length} Members`
                : chatDetails?.status
                ? "Online"
                : "Offline"}
            </span>
          </div>
        </div>
        <div className={styles.chat_icons}>
          {/* <i className="bxs-phone-call"></i> */}
          <i className="bx-video" onClick={() => handleCall("video")}></i>
          <i className="bxs-info-circle" onClick={toggleInfo}></i>
          <i className="bx-dots-vertical-rounded" id="more-option"></i>
          <DropDown
            selector="#more-option"
            placement="bottom-end"
            zIndex={2001}
          >
            {matches && (
              <Fragment>
                <DropDown.Item className="dropdown-option" onClick={toggleInfo}>
                  <span>View Profile</span>
                  <i className="bx bx-user"></i>
                </DropDown.Item>
                {/* <DropDown.Item
                  className="dropdown-option"
                  onClick={() => handleCall("audio")}
                >
                  <span>Audio</span>
                  <i className="bx bxs-phone-call"></i>
                </DropDown.Item> */}
                <DropDown.Item
                  className="dropdown-option"
                  onClick={() => handleCall("video")}
                >
                  <span>Video</span>
                  <i className="bx bx-video"></i>
                </DropDown.Item>
              </Fragment>
            )}
            <DropDown.Item className="dropdown-option">
              <span>Muted</span>
              <i className="bx-microphone-off"></i>
            </DropDown.Item>
            <DropDown.Item className="dropdown-option">
              <span>Delete</span>
              <i className="bx-trash"></i>
            </DropDown.Item>
          </DropDown>
        </div>
      </div>
      {loading && (
        <div className={styles.loader}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <Conversation
        chats={chats}
        onDelete={onDelete}
        onCopy={onCopy}
        onReply={onReply}
        userId={user?.id}
        otherUserId={chatDetails?.userId || chatDetails?.users}
        focusMsgById={focusMsgById}
        newMsg={newMsg}
        chatId={chatId}
      />
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
