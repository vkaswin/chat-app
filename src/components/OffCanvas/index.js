import React from "react";
import { Portal, Overlay } from "components";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import styles from "./OffCanvas.module.scss";
import { classNames } from "utils";

export const OffCanvas = ({
  position,
  isOpen,
  toggle,
  children,
  className,
  overlay,
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

OffCanvas.propType = {
  isOpen: PropTypes.bool,
  position: PropTypes.oneOf(["left", "right", "bottom", "top"]),
  toggle: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  overlay: PropTypes.bool,
};

OffCanvas.defaultProps = {
  isOpen: false,
  position: "left",
  className: null,
  toggle: () => {},
  overlay: true,
};
