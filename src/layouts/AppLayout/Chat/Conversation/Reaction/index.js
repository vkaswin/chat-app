import React from "react";
import { DropDown, DropDownItem } from "components";
import { getReactionUrl } from "utils";

import styles from "./Reaction.module.scss";

export const Reaction = ({ reactions, selector, onClick }) => {
  return (
    <DropDown
      selector={selector}
      className={styles.container}
      placement="bottom"
      zIndex={2000}
    >
      {reactions.map((emoji, index) => {
        return (
          <DropDownItem
            className={styles.wrapper}
            key={index}
            onClick={() => onClick(emoji)}
          >
            <img id={emoji} src={getReactionUrl(emoji)} />
          </DropDownItem>
        );
      })}
    </DropDown>
  );
};
