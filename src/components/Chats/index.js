import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { DropDown, Avatar, OffCanvas, Toast, ScrollBar } from "components";
import { TextArea } from "./TextArea";
import { Conversation } from "./Conversation";
import { VideoPopup } from "./VideoPopup";
import { io } from "socket.io-client";
import { sockets } from "config";
import { useAuth, useObserver, useRouter } from "hooks";
import { createMessage, getMessagesByChatId } from "services/Message";
import { CSSTransition } from "react-transition-group";

import messageRingTone from "assets/audio/fade-in-tone.mp3";
import favicon from "assets/images/favicon.ico";

import styles from "./Chats.module.scss";

export const Chats = () => {
  const { matches } = window.matchMedia(`(max-width: 768px)`);

  const chatContainerRef = useRef();

  const replyContainerRef = useRef();

  const { user } = useAuth();

  const router = useRouter();

  const socket = useRef();

  const peerConnection = useRef();

  const [chats, setChats] = useState([]);

  const [showInfo, setShowInfo] = useState(false);

  const [showVideo, setShowVideo] = useState(false);

  const [replyId, setReplyId] = useState(null);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const {
    query: { userId, chatId },
  } = useRouter();

  const [loaderRef, isVisible] = useObserver();

  let iceCandidate;

  //   Socket
  useEffect(() => {
    if (socket.current) return;

    const webSocket = io(sockets.chat);

    webSocket.on("connect", () => {
      webSocket.emit("join-chat-room", chatId);

      webSocket.on("receive-message", handleReceiveMessage);

      webSocket.on("receive-offer", handleReceiveOffer);

      webSocket.on("receive-answer", handleReceiveAnswer);

      socket.current = webSocket;
    });

    return () => {
      webSocket.current && webSocket.disconnect();
    };
  }, []);

  //   Fetch Messages
  useEffect(() => {
    // getMessages();
  }, [page]);

  useEffect(() => {
    // console.log("loading...");
    // setPage(page + 1);
  }, [isVisible]);

  //   Scroll To Chat End
  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  //   Reply Msg UI
  useEffect(() => {
    if (!replyId) return;
    const { clientHeight } = replyContainerRef.current;
    chatContainerRef.current.setAttribute(
      "style",
      `--chat-pb :${clientHeight}px`
    );
    scrollToBottom();
  }, [replyId]);

  //   Profile
  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  //   Chats
  const getMessages = async () => {
    try {
      let params = {
        limit: 10,
        page,
      };
      let {
        data: { data },
      } = await getMessagesByChatId(chatId, params);
      prependMessageInChat(data);
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    } finally {
      setLoading(false);
    }
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
        from: user.id,
        to: userId,
        msg: msg,
        date: new Date().toISOString(),
        seen: false,
        ...(replyId && { reply: replyId }),
      };
      let {
        data: { data },
      } = await createMessage(chatId, body);
      socket.current.emit("send-message", data, chatId);
      appendMessageInChats(data);
      replyId && clearReplyMsg();
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    }
  };

  const prependMessageInChat = (msg) => {
    if (Array.isArray(msg)) {
      setChats((prev) => [...msg, ...prev]);
    } else {
      setChats((prev) => [msg, ...prev]);
    }
  };

  const appendMessageInChats = (msg) => {
    if (Array.isArray(msg)) {
      setChats((prev) => [...prev, ...msg]);
    } else {
      setChats((prev) => [...prev, msg]);
    }
  };

  const onDelete = (id) => {
    setChats(chats.filter((_, index) => id !== index));
  };

  //   Copy Msg
  const onCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  //   Reply Msg
  const onReply = (id) => {
    setReplyId(id);
  };

  const clearReplyMsg = () => {
    chatContainerRef.current.style.removeProperty("--chat-pb");
    setReplyId(null);
  };

  const focusMsgById = (id) => {
    const element = document.querySelector(`[data-msgid='${id}']`);
    if (!element) return;
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const replyMsg = useMemo(() => {
    return chats.find(({ _id }) => replyId === _id);
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
        socket.current.emit("send-offer", data, chatId);
      } else if (localDescription.type === "answer") {
        let data = {
          answer: localDescription,
          iceCandidate,
        };
        socket.current.emit("send-answer", data, chatId);
      }
    }
  };

  const handleReceiveOffer = async ({ iceCandidate, offer }) => {
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

  const handleReceiveAnswer = async ({ iceCandidate, answer }) => {
    try {
      await peerConnection.current.setRemoteDescription(answer);
      await peerConnection.current.addIceCandidate(iceCandidate);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReceiveMessage = (data) => {
    showNotification(data.msg);
    playMessageRingTone();
    appendMessageInChats(data);
  };

  const handleVideoCall = async () => {
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
      let offer = await peerConnection.current.createOffer({
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1,
      });
      await peerConnection.current.setLocalDescription(offer);
    } catch (error) {
      console.log(error);
    }
  };

  // Ringtone
  const playMessageRingTone = () => {
    const audio = new Audio(messageRingTone);
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

  return (
    <div ref={chatContainerRef} className={styles.chat_wrapper}>
      {!loading && (
        <div ref={loaderRef}>
          <span>Loading...</span>
        </div>
      )}
      {loading ? (
        <div className={styles.chat_loader}>
          <span></span>
        </div>
      ) : (
        <Conversation
          chats={chats}
          container={chatContainerRef}
          onDelete={onDelete}
          onCopy={onCopy}
          onReply={onReply}
          userId={user.id}
          focusMsgById={focusMsgById}
        />
      )}
      <div className={styles.chat_header}>
        <div className={styles.user_info}>
          <div className={styles.go_back} onClick={() => router.goBack()}>
            <i className="bx bx-chevron-left"></i>
          </div>
          <Avatar
            src="https://themesbrand.com/doot/layouts/assets/images/users/avatar-2.jpg"
            size={50}
            status
          />
          <div className={styles.user_name}>
            <b>Bella Cote</b>
            <span>Online</span>
          </div>
        </div>
        <div className={styles.chat_icons}>
          <i className="bx-search"></i>
          <i className="bxs-phone-call"></i>
          <i className="bx-video" onClick={handleVideoCall}></i>
          <i className="bxs-info-circle" onClick={toggleInfo}></i>
          <i className="bx-dots-vertical-rounded" id="more-option"></i>
          <DropDown
            selector="#more-option"
            placement="bottom-end"
            zIndex={1026}
          >
            {matches && (
              <Fragment>
                <DropDown.Item
                  className={styles.more_option}
                  onClick={toggleInfo}
                >
                  <span>View Profile</span>
                  <i className="bx bx-user"></i>
                </DropDown.Item>
                <DropDown.Item className={styles.more_option}>
                  <span>Audio</span>
                  <i className="bx bxs-phone-call"></i>
                </DropDown.Item>
                <DropDown.Item
                  className={styles.more_option}
                  onClick={handleVideoCall}
                >
                  <span>Video</span>
                  <i className="bx bx-video"></i>
                </DropDown.Item>
              </Fragment>
            )}
            <DropDown.Item className={styles.more_option}>
              <span>Muted</span>
              <i className="bx-microphone-off"></i>
            </DropDown.Item>
            <DropDown.Item className={styles.more_option}>
              <span>Delete</span>
              <i className="bx-trash"></i>
            </DropDown.Item>
          </DropDown>
        </div>
      </div>
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
      <TextArea onSend={onSend} />
      <OffCanvas
        isOpen={showInfo}
        position="right"
        className={styles.profile_sidebar}
        toggle={toggleInfo}
      >
        <div>Hello</div>
      </OffCanvas>
      <VideoPopup isOpen={showVideo} />
      <ScrollBar />
    </div>
  );
};

//   bx bx-microphone
//   bx bx-video
//   bx-exit-fullscreen
//   bx-fullscreen
//   bxs-phone-call
//   bxs-phone
//   bx-cast
//   bx-stop
