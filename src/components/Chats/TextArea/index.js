import React, { Fragment, useEffect, useState } from "react";
import { Emoji } from "./Emoji";

import styles from "./TextArea.module.scss";

export const TextArea = ({ onSend }) => {
  const [showEmoji, setShowEmoji] = useState(false);

  const [text, setText] = useState("");

  const [rec, setRec] = useState();

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
    rec?.start();
  };

  const onPointerUp = () => {
    rec?.stop();
  };

  const handleFile = (e) => {
    console.log(e);
  };

  return (
    <Fragment>
      <div className={styles.chat_input}>
        <i className="bx-smile" id="emoji"></i>
        <div className={styles.input_field}>
          <textarea name="chat-input" value={text} onChange={handleChange} />
          <label htmlFor="chat-file">
            <i className="bx-paperclip" id="attach"></i>
          </label>
          <input id="chat-file" type="file" onChange={handleFile} hidden />
        </div>
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
