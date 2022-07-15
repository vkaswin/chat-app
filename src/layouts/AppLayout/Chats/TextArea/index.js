import { Tooltip } from "components";
import React, { Fragment } from "react";

import styles from "./TextArea.module.scss";

export const TextArea = () => {
  const tooltip = [
    {
      id: "#more",
      label: "More",
    },
    {
      id: "#emoji",
      label: "Emoji",
    },
    {
      id: "#mic",
      label: "Record",
    },
  ];

  return (
    <Fragment>
      <div className={styles.chat_input}>
        <i className="bx-dots-horizontal-rounded" id="more"></i>
        <i className="bx-smile" id="emoji"></i>
        <textarea />
        <i className="bx-microphone" id="mic"></i>
        <button>
          <i className="bxs-send"></i>
        </button>
      </div>
      {tooltip.map(({ id, label }, index) => {
        return (
          <Tooltip selector={id} key={index} position="top-center">
            {label}
          </Tooltip>
        );
      })}
    </Fragment>
  );
};
