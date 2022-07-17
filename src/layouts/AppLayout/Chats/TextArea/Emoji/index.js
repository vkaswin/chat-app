import React, { useRef, useEffect, Fragment } from "react";
import { Portal, Popper, Tooltip } from "components";
import { CSSTransition } from "react-transition-group";
import { clickOutside } from "utils";
import emojis from "data/emoji.json";

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

  const targetRef = useRef();

  const emojiRef = useRef();

  useEffect(() => {
    if (selector.length === 0) return;

    const element = document.querySelector(selector);

    if (!element) return;

    targetRef.current = element;
    element.onclick = toggle;
  }, []);

  const onEntered = (ele) => {
    clickOutside({
      ref: ele,
      onClose: toggle,
      doNotClose: (event) => {
        return targetRef.current.contains(event);
      },
    });
  };

  const handleFocus = (title) => () => {
    const { offsetTop } = document.querySelector(
      `[data-emoji-title="${title}"]`
    );
    emojiRef.current.scrollTo(0, offsetTop - 95);
  };

  const handleEmoji = (emoji) => () => {
    onChange(emoji);
    toggle();
  };

  return (
    <Portal>
      <CSSTransition
        in={isOpen}
        timeout={300}
        unmountOnExit
        classNames={{
          enterActive: styles.emoji_enter,
          exitActive: styles.emoji_exit,
        }}
        onEntered={onEntered}
      >
        <div>
          <Popper
            referenceElement={targetRef}
            position="top-center"
            offset={20}
            render={({ popper, position, ref }) => {
              return (
                <div
                  ref={ref}
                  className={styles.emoji_container}
                  data-position={position}
                  style={popper}
                >
                  <div className={styles.emoji_wrapper}>
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
                              position="top-center"
                              selector={`#emoji-type-${index}`}
                              offset={20}
                            >
                              {label}
                            </Tooltip>
                          </div>
                        );
                      })}
                      <div
                        id="emoji-close"
                        className={styles.close}
                        onClick={toggle}
                      >
                        <span>&#10799;</span>
                        <Tooltip
                          position="top-center"
                          selector={`#emoji-close`}
                          offset={15}
                        >
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
                            <div
                              className={styles.emoji_title}
                              data-emoji-title={title}
                            >
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
                                    <div className={styles.emoji_icon}>
                                      {emoji}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }}
          ></Popper>
        </div>
      </CSSTransition>
    </Portal>
  );
};
