import React from "react";
import { Portal } from "components";
import { CSSTransition } from "react-transition-group";
import { classNames } from "utils";

import styles from "./OffCanvas.module.scss";

export const OffCanvas = ({
  position = "left",
  isOpen = false,
  toggle = () => {},
  children,
  className = null,
  overlay = true,
  zIndex,
}) => {
  return (
    <Portal>
      <CSSTransition
        in={isOpen}
        timeout={300}
        unmountOnExit
        classNames={{
          enterActive: styles.offcanvas_enter,
          exitActive: styles.offcanvas_exit,
        }}
        style={{ "--zIndex": zIndex }}
      >
        <div style={{ "--anime": `from-${position}` }}>
          <div
            className={classNames(styles.offcanvas, className)}
            data-position={position}
          >
            {children}
          </div>
          {overlay && (
            <div
              className={styles.offcanvas_overlay}
              onClick={() => {
                isOpen && toggle();
              }}
            ></div>
          )}
        </div>
      </CSSTransition>
    </Portal>
  );
};
