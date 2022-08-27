import React from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { classNames } from "utils";

import styles from "./Modal.module.scss";

export const Modal = ({
  isOpen,
  toggle,
  children,
  width = 550,
  closeClickOnOutside = false,
  zIndex,
}) => {
  const Portal = ({ children }) => {
    return createPortal(children, document.body);
  };

  return (
    <CSSTransition
      in={isOpen}
      unmountOnExit
      timeout={300}
      classNames={{
        enterActive: styles.modal_enter,
        exitActive: styles.modal_exit,
      }}
    >
      <Portal>
        <div style={{ "--zIndex": zIndex }}>
          <div
            className={styles.modal}
            onClick={() => {
              isOpen && closeClickOnOutside && toggle();
            }}
          >
            <div
              className={styles.modal_dialog}
              style={{ "--modal-width": `${width}px` }}
            >
              <div
                className={styles.modal_content}
                onClick={(e) => e.stopPropagation()}
              >
                {children}
              </div>
            </div>
          </div>
          <div className={styles.modal_overlay}></div>
        </div>
      </Portal>
    </CSSTransition>
  );
};
