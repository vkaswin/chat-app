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
    >
      {reactions.map((reaction, index) => {
        return (
          <DropDownItem
            className={styles.wrapper}
            key={index}
            onClick={() => onClick(reaction)}
          >
            <img id={reaction} src={getReactionUrl(reaction)} />
          </DropDownItem>
        );
      })}
    </DropDown>
  );
};
