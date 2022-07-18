import React, { useRef, useState, useEffect } from "react";
import { Popper, Portal } from "components";
import PropTypes from "prop-types";
import { clickOutside } from "utils";
import { PopperPlacements } from "utils/constants";
import { CSSTransition } from "react-transition-group";

import styles from "./Popover.module.scss";

export const Popover = ({ children, placement, offset, selector }) => {
  const targetRef = useRef();

  const [isOpen, setIsOpen] = useState(false);

  const show = () => {
    setIsOpen(true);
  };

  const hide = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (selector.length === 0) return;

    const element = document.querySelector(selector);

    if (!element) return;

    targetRef.current = element;
    element.onclick = show;
  }, []);

  const onEntered = (ele) => {
    clickOutside({
      ref: ele,
      onClose: hide,
      doNotClose: (event) => {
        return targetRef.current.contains(event);
      },
    });
  };

  return (
    <Portal>
      <CSSTransition
        in={isOpen}
        timeout={250}
        classNames={{
          enterActive: styles.popover_enter,
          exitActive: styles.popover_exit,
        }}
        unmountOnExit
        onEntered={onEntered}
      >
        <Popper
          referenceRef={targetRef}
          placement={placement}
          offset={offset}
          render={({ popper, position, ref }) => {
            return (
              <div
                ref={ref}
                className={styles.popover}
                data-position={position}
                style={popper}
              >
                <div className={styles.menu}>{children}</div>
              </div>
            );
          }}
        />
      </CSSTransition>
    </Portal>
  );
};

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(PopperPlacements),
  offset: PropTypes.number,
  arrow: PropTypes.bool,
  className: PropTypes.string,
  selector: PropTypes.string.isRequired,
  strategy: PropTypes.oneOf(["absolute", "fixed"]),
};

Popover.defaultProps = {
  placement: "top-center",
  arrow: true,
  offset: 15,
  className: null,
  strategy: "absolute",
};
