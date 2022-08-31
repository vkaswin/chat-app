import React, { Fragment, useEffect, useState } from "react";
import { fileUpload } from "services/Others";
import { Emoji } from "./Emoji";
import { useForm } from "react-hook-form";
import { throttle } from "utils";

import styles from "./TextArea.module.scss";

export const TextArea = ({ onSend, onFocus }) => {
  const { handleSubmit, reset, register, watch } = useForm();

  const message = watch("message");

  const [showEmoji, setShowEmoji] = useState(false);

  const [text, setText] = useState("");

  const [rec, setRec] = useState();

  useEffect(() => {
    if (!message || message.length === 0) return;
    // console.log(message);
  }, [message]);

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

  const handleTyping = () => {
    console.log("typing");
  };

  const handleEmoji = (emoji) => {
    setText(text.concat(emoji));
  };

  const toggleEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  const onSubmit = async () => {
    await onSend(message);
    reset({ message: "" });
  };

  const onPointerDown = () => {
    rec?.start();
  };

  const onPointerUp = () => {
    rec?.stop();
  };

  const handleFile = ({ target: { files } }) => {
    const formData = new FormData();

    for (const file of files) {
      formData.append("file", file);
    }

    fileUpload(formData);
  };

  return (
    <Fragment>
      <div className={styles.chat_input}>
        <i className="bx-smile" id="emoji"></i>
        <div className={styles.input_field}>
          <textarea
            name="chat-input"
            onFocus={onFocus}
            {...register("message", { required: true })}
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
        <button onClick={handleSubmit(onSubmit)}>
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
