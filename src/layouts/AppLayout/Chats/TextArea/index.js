import React, { Fragment, useState } from "react";
import { Emoji } from "./Emoji";

import styles from "./TextArea.module.scss";

export const TextArea = ({ onSend }) => {
  const [showEmoji, setShowEmoji] = useState(false);

  const [text, setText] = useState("");

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

  return (
    <Fragment>
      <div className={styles.chat_input}>
        <i className="bx-paperclip" id="attach"></i>
        <i className="bx-smile" id="emoji"></i>
        <textarea name="chat-input" value={text} onChange={handleChange} />
        <i className="bx-microphone" id="mic"></i>
        <button onClick={handleSend}>
          <i className="bxs-send"></i>
        </button>
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
