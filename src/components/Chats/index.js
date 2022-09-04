import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { DropDown, Avatar, OffCanvas, Toast, ScrollBar } from "components";
import { TextArea } from "./TextArea";
import { Conversation } from "./Conversation";
import { VideoPopup } from "./VideoPopup";
import { useAuth, useRouter, useSocket } from "hooks";
import { createMessage, getMessagesByChatId } from "services/Message";
import { getChatById } from "services/Chat";
import { initiateCall } from "services/Call";
import { CSSTransition } from "react-transition-group";

import messageRingTone from "assets/audio/fade-in-tone.mp3";
import favicon from "assets/images/favicon.ico";

import styles from "./Chats.module.scss";

const audio = new Audio(messageRingTone);

export const Chats = () => {
  const { matches } = window.matchMedia(`(max-width: 768px)`);

  const chatContainerRef = useRef();

  const replyContainerRef = useRef();

  const { user, chatId } = useAuth();

  const { socket, connected } = useSocket();

  const router = useRouter();

  const peerConnection = useRef();

  const [chats, setChats] = useState({});

  const [showInfo, setShowInfo] = useState(false);

  const [showVideo, setShowVideo] = useState(false);

  const [replyId, setReplyId] = useState(null);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [chatDetails, setChatDetails] = useState({});

  const prevChatId = useRef();

  const msgId = useRef();

  let iceCandidate;

  //   Socket
  useEffect(() => {
    if (!socket || !connected || !chatId) return;

    if (prevChatId.current && prevChatId.current !== chatId) {
      leaveRoom();
    }

    prevChatId.current = chatId;

    socket.emit("join-chat", chatId);

    socket.on("receive-message", handleReceiveMessage);

    socket.on("receive-offer", handleOffer);

    socket.on("receive-answer", handleAnswer);

    return () => {
      leaveRoom();
    };
  }, [chatId, connected, socket]);

  useEffect(() => {
    if (chats.length !== 0) {
      setChats({});
    }
    getChatDetails();
  }, [chatId]);

  //   Fetch Messages
  useEffect(() => {
    if (!chatId) return;
    getMessages();
  }, [page, chatId]);

  useEffect(() => {
    if (!msgId.current) return;
    focusMsgById(msgId.current);
  }, [chats]);

  //   Profile
  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  //   Chats
  const getChatDetails = async () => {
    try {
      let {
        data: { data },
      } = await getChatById(chatId);
      setChatDetails(data);
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    }
  };

  const getMessages = async () => {
    try {
      let params = {
        limit: 30,
        page,
      };
      let {
        data: {
          data: {
            list,
            pageMeta: { total },
          },
        },
      } = await getMessagesByChatId(chatId, params);
      groupMessagesByDate(list, total);
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    }
  };

  const groupMessagesByDate = (list, total) => {
    msgId.current = list[list.length - 1]._id;

    const chatsByDate = list.reduce((initial, msg) => {
      const key = getDate(msg.date);
      return initial.hasOwnProperty(key)
        ? {
            ...initial,
            [key]: [...initial[key], msg],
          }
        : { ...initial, [key]: [msg] };
    }, {});

    const mergeObject = (obj) => {
      if (Object.keys(chats).length === 0) return obj;

      const final = Object.entries(obj).reduce((initial, [date, msg]) => {
        const key = getDate(date);
        return initial.hasOwnProperty(key)
          ? {
              ...initial,
              [key]: [...initial[key], ...msg].sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
              }),
            }
          : { ...initial, [key]: msg };
      }, chats);

      const sortByDate = Object.keys(final).sort((a, b) => {
        return new Date(a) - new Date(b);
      });

      return sortByDate.reduce((initial, date) => {
        return { ...initial, [date]: final[date] };
      }, {});
    };

    setChats(mergeObject(chatsByDate));
    setTotalPages(total);
  };

  const handleScroll = ({ target: { scrollTop } }) => {
    if (scrollTop !== 0 || page >= totalPages) return;
    setPage((prev) => prev + 1);
  };

  const scrollToBottom = () => {
    const { scrollHeight } = chatContainerRef.current;
    chatContainerRef.current.scrollTo({
      top: scrollHeight,
      behavior: "smooth",
    });
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
    msgId.current = data[data.length - 1]._id;

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

  const focusMsgById = (id) => {
    const element = document.querySelector(`[msgid='${id}']`);
    if (!element) return;
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const replyMsg = useMemo(() => {
    return null;
    // return chats.find(({ _id }) => replyId === _id);
  }, [replyId]);

  //   Video Call
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

  const handleReceiveMessage = (data) => {
    if (data.sender === user?.id) return;

    showNotification(data.msg);
    playMessageRingTone();
    addMessageInChat(data);
  };

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

  const leaveRoom = () => {
    socket.emit("leave-chat", prevChatId);
  };

  const handleFocus = () => {
    const { matches } = window.matchMedia(`(max-width: 768px)`);
    if (!matches) return;
    scrollToBottom();
  };

  const getDate = (date) => {
    return date.split("T")[0];
  };

  return (
    <div
      ref={chatContainerRef}
      className={styles.chat_wrapper}
      onScroll={handleScroll}
    >
      <div className={styles.chat_header}>
        <div className={styles.user_info}>
          <div className={styles.go_back} onClick={() => router.goBack()}>
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
          <i className="bx-search"></i>
          <i className="bxs-phone-call"></i>
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
                <DropDown.Item
                  className="dropdown-option"
                  onClick={() => handleCall("audio")}
                >
                  <span>Audio</span>
                  <i className="bx bxs-phone-call"></i>
                </DropDown.Item>
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
      {page < totalPages && <div>Loading...</div>}
      <Conversation
        chats={chats}
        container={chatContainerRef}
        onDelete={onDelete}
        onCopy={onCopy}
        onReply={onReply}
        userId={user.id}
        focusMsgById={focusMsgById}
      />
      <TextArea onSend={onSend} onFocus={handleFocus} />
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
