import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { DropDown, Avatar, OffCanvas, Toast } from "components";
import { TextArea } from "./TextArea";
import { Conversation } from "./Conversation";
import { VideoPopup } from "./VideoPopup";
import { io } from "socket.io-client";
import { sockets } from "config";
import { useAuth, useRouter } from "hooks";
import { sendMessage } from "services/Chat";
import chatData from "data/chats.json";

import styles from "./Chats.module.scss";

export const Chats = () => {
  const { matches } = window.matchMedia(`(max-width: 768px)`);

  const chatContainerRef = useRef();

  const { user } = useAuth();

  const socket = useRef();

  const peerConnection = useRef();

  const [chats, setChats] = useState(chatData.chats);

  const [showInfo, setShowInfo] = useState(false);

  const [showVideo, setShowVide] = useState(false);

  let iceCandidate;

  const {
    query: { userId, chatId },
  } = useRouter();

  useLayoutEffect(() => {
    scrollToBottom();
  }, [chats]);

  useEffect(() => {
    const webSocket = io(sockets.chat);

    webSocket.on("connect", () => {
      const pc = new RTCPeerConnection();

      webSocket.emit("join-chat-room", chatId);

      webSocket.on("receive-message", handleReceiveMessage);

      webSocket.on("receive-offer", handleReceiveOffer);

      webSocket.on("receive-answer", handleReceiveAnswer);

      pc.onicecandidate = handleIceCandidate;

      pc.ontrack = handleTrack;

      peerConnection.current = pc;
      socket.current = webSocket;
    });
  }, []);

  const handleTrack = ({ streams: [remoteStream] }) => {
    console.log(remoteStream);
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
    setShowVide(true);
    try {
      let localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
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

  const handleReceiveMessage = (msg) => {
    console.log(msg);
  };

  const handleVideoCall = async () => {
    setShowVide(true);
    try {
      let localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
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

  const scrollToBottom = () => {
    const { scrollHeight } = chatContainerRef.current;

    chatContainerRef.current.scrollTo({
      top: scrollHeight,
      behavior: "smooth",
    });
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const onSend = async (msg) => {
    try {
      let data = {
        from: userId,
        to: user.userId,
        msg: msg,
        date: new Date().toISOString(),
        chatId,
      };
      let res = await sendMessage(data);
      console.log(res);
      socket.current.emit("send-message", res, chatId);
      setChats([...chats, data]);
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    }
  };

  const deleteMsg = (id) => {
    setChats(chats.filter((_, index) => id !== index));
  };

  const moreDropDown = [
    {
      label: "View Profile",
      icon: "bx bx-user",
      onClick: toggleInfo,
      show: matches,
    },
    {
      label: "Audio",
      icon: "bx bxs-phone-call",
      show: matches,
    },
    {
      label: "Video",
      icon: "bx bx-video",
      onClick: handleVideoCall,
      show: matches,
    },
    {
      label: "Archive",
      icon: "bx-archive",
    },
    {
      label: "Muted",
      icon: "bx-microphone-off",
    },
    {
      label: "Delete",
      icon: "bx-trash",
    },
  ];

  //   bx bx-microphone
  //   bx bx-video
  //   bx-exit-fullscreen
  //   bx-fullscreen
  //   bxs-phone-call
  //   bxs-phone
  //   bx-cast
  //   bx-stop

  return (
    <div ref={chatContainerRef} className={styles.chat_wrapper}>
      <Conversation
        chats={chats}
        container={chatContainerRef}
        deleteMsg={deleteMsg}
      />
      <div className={styles.chat_header}>
        <div className={styles.user_info}>
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
            {moreDropDown.map(
              ({ label, icon, onClick = false, show = true }, index) => {
                return show ? (
                  <DropDown.Item
                    key={index}
                    className={styles.more_option}
                    {...(typeof onClick === "function" && { onClick })}
                  >
                    <span>{label}</span>
                    <i className={icon}></i>
                  </DropDown.Item>
                ) : null;
              }
            )}
          </DropDown>
        </div>
      </div>
      <TextArea onSend={onSend} />
      <OffCanvas
        isOpen={showInfo}
        position="right"
        className={styles.profile_sidebar}
        toggle={toggleInfo}
      >
        <div>helo</div>
      </OffCanvas>
      <VideoPopup isOpen={showVideo} />
    </div>
  );
};
