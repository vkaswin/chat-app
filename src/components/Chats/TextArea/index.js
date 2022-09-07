import React, { Fragment, useEffect, useRef, useState } from "react";
import { fileUpload } from "services/Others";
import { Emoji } from "./Emoji";
import { Toast } from "components/Toast";
import { debounce } from "utils";
import { socket } from "socket";

import styles from "./TextArea.module.scss";

export const TextArea = ({ onSend, onFocus, chatId, otherUser }) => {
  const [showEmoji, setShowEmoji] = useState(false);

  const [text, setText] = useState("");

  const [rec, setRec] = useState();

  const [typing, setTyping] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onstart = (e) => {
      console.log(e);
    };

    recognition.onend = (e) => {
      console.log(e);
    };

    recognition.onresult = ({ results }) => {
      let transcript = Array.from(results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

      setText(text.concat(transcript));
    };

    recognition.onerror = (e) => {
      console.log(e);
    };

    setRec(recognition);
  }, []);

  const getUsers = () => {
    return Array.isArray(otherUser)
      ? otherUser.map(({ _id, name }) => {
          return {
            id: _id,
            name,
          };
        })
      : otherUser;
  };

  const handleTyping = () => {
    console.log(chatId, "textarea");
    socket.emit("end-typing", chatId, getUsers());
    setTyping(false);
  };

  const handleKeyDown = () => {
    if (typing) return;
    socket.emit("start-typing", chatId, getUsers());
    setTyping(true);
  };

  const handleEmoji = (emoji) => {
    setText(text.concat(emoji));
  };

  const toggleEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  const onSubmit = async () => {
    const text = inputRef.current.value;
    if (text.length === 0) return;

    await onSend(text);
    inputRef.current.value = "";
  };

  const onPointerDown = () => {
    rec?.start();
  };

  const onPointerUp = () => {
    rec?.stop();
  };

  const handleFile = async ({ target: { files } }) => {
    try {
      const formData = new FormData();

      for (const file of files) {
        formData.append("file", file);
      }

      const res = await fileUpload(formData);
      console.log(res);
    } catch (error) {
      Toast({ type: "error", message: error?.message });
    }
  };

  return (
    <Fragment>
      <div className={styles.chat_input}>
        <i className="bx-smile" id="emoji"></i>
        <div className={styles.input_field}>
          <textarea
            ref={inputRef}
            name="chat-input"
            onFocus={onFocus}
            onKeyDown={handleKeyDown}
            onChange={debounce(handleTyping, 1000)}
          />
          <label htmlFor="chat-file">
            <i className="bx-paperclip" id="attach"></i>
          </label>
          <input
            id="chat-file"
            type="file"
            onChange={handleFile}
            multiple
            hidden
          />
        </div>
        <button onClick={onSubmit}>
          <i className="bxs-send"></i>
        </button>
        <i
          className="bx-microphone"
          id="mic"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        ></i>
      </div>
      <Emoji
        selector="#emoji"
        isOpen={showEmoji}
        toggle={toggleEmoji}
        onChange={handleEmoji}
      />
    </Fragment>
  );
};
