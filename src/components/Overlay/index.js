import React from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

import styles from "./Overlay.module.scss";

export const Overlay = ({ isOpen, toggle, zIndex, duration }) => {
  return (
    <CSSTransition
      in={isOpen}
      classNames={{
        enterActive: styles.overlay_enter,
        exitActive: styles.overlay_exit,
      }}
    >
      <div
        style={{
          "--overlay-zindex": zIndex,
          "--overlay-duration": `${duration}ms`,
        }}
        className={styles.overlay}
        onClick={() => {
          isOpen && toggle();
        }}
      ></div>
    </CSSTransition>
  );
};

Overlay.propTypes = {
  isOpen: PropTypes.bool,
  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  toggle: () => {},
};

Overlay.defaultProps = {
  zIndex: 1025,
  duration: 300,
  isOpen: false,
  toggle: () => {},
};
