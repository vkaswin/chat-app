import React, { Fragment, useState } from "react";
import { Emoji } from "./Emoji";

import styles from "./TextArea.module.scss";

export const TextArea = () => {
  const [showEmoji, setShowEmoji] = useState(false);

  const toggleEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  return (
    <Fragment>
      <div className={styles.chat_input}>
        <i className="bx-paperclip" id="attach"></i>
        <i className="bx-smile" id="emoji"></i>
        <textarea />
        <i className="bx-microphone" id="mic"></i>
        <button>
          <i className="bxs-send"></i>
        </button>
      </div>
      <Emoji selector="#emoji" isOpen={showEmoji} toggle={toggleEmoji} />
    </Fragment>
  );
};
