import React, { useRef } from "react";
import { Tooltip, DropDown } from "components";
import emojis from "./emoji.json";

import styles from "./Emoji.module.scss";

export const Emoji = ({ toggle, isOpen, selector, onChange }) => {
  const types = [
    {
      label: "Smileys & People",
      icon: "bx-smile",
    },
    {
      label: "Animals & Nature",
      icon: "bx-leaf",
    },
    {
      label: "Travel & Places",
      icon: "bx-home-alt",
    },
    {
      label: "Activities",
      icon: "bx-baseball",
    },
    {
      label: "Objects",
      icon: "bx-world",
    },
    {
      label: "Symbols",
      icon: "bx-bulb",
    },
    {
      label: "Flags",
      icon: "bx-flag",
    },
  ];

  const emojiRef = useRef();

  const handleFocus = (title) => () => {
    const { offsetTop } = document.querySelector(`[emoji-title="${title}"]`);
    emojiRef.current.scrollTo(0, offsetTop - 95);
  };

  const handleEmoji = (emoji) => () => {
    onChange(emoji);
    toggle();
  };

  return (
    <DropDown
      isOpen={isOpen}
      toggle={toggle}
      selector={selector}
      placement="top-center"
      zIndex={2000}
    >
      <div className={styles.emoji_container}>
        <div className={styles.emoji_header}>
          {types.map(({ label, icon }, index) => {
            return (
              <div
                key={index}
                id={`emoji-type-${index}`}
                className={styles.emoji_type}
                onClick={handleFocus(label)}
              >
                <i className={icon}></i>
                <Tooltip
                  placement="top"
                  selector={`#emoji-type-${index}`}
                  offset={10}
                >
                  {label}
                </Tooltip>
              </div>
            );
          })}
          <div id="emoji-close" className={styles.close} onClick={toggle}>
            <span>&#10799;</span>
            <Tooltip placement="top" selector={`#emoji-close`} offset={10}>
              Close
            </Tooltip>
          </div>
        </div>
        <div className={styles.search_emoji}>
          <input type="text" placeholder="Search Emoji" />
          <div className={styles.search_icon}>
            <i className="bx-search-alt-2"></i>
          </div>
        </div>
        <div className={styles.emoji_card} ref={emojiRef}>
          {Object.entries(emojis).map(([title, list], index) => {
            return (
              <div key={index}>
                <div className={styles.emoji_title} emoji-title={title}>
                  <b>{title}</b>
                </div>
                <div className={styles.emoji_list}>
                  {list.map(({ emoji, description }, index) => {
                    return (
                      <button
                        key={index}
                        title={description}
                        onClick={handleEmoji(emoji)}
                      >
                        <div className={styles.emoji_icon}>{emoji}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DropDown>
  );
};
