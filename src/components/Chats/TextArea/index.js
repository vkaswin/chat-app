import React, { Fragment, useEffect, useState } from "react";
import { Emoji } from "./Emoji";

import styles from "./TextArea.module.scss";

export const TextArea = ({ onSend }) => {
  const [showEmoji, setShowEmoji] = useState(false);

  const [text, setText] = useState("");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const recognition = new SpeechRecognition();

  useEffect(() => {
    recognition.interimResults = true;
    recognition.continuous = true;

    // console.log(recognition);

    recognition.onstart = (e) => {
      console.log(e);
    };

    recognition.onend = (e) => {
      console.log(e);
    };

    recognition.onnomatch = (e) => {
      console.log(e);
    };

    recognition.onresult = (e) => {
      console.log(e);
    };

    recognition.onerror = (e) => {
      console.log(e);
    };
  }, []);

  const handleChange = ({ target: { value } }) => {
    setText(value);
  };

  const handleEmoji = (emoji) => {
    setText(text.concat(emoji));
  };

  const toggleEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  const handleSend = () => {
    onSend(text);
    setText("");
  };

  const onPointerDown = () => {
    recognition.start();
  };

  const onPointerUp = () => {
    recognition.stop();
  };

  return (
    <Fragment>
      <div className={styles.chat_input}>
        <i className="bx-paperclip" id="attach"></i>
        <i className="bx-smile" id="emoji"></i>
        <textarea name="chat-input" value={text} onChange={handleChange} />
        <button onClick={handleSend}>
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
