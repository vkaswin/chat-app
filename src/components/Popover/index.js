import React, { useRef, useState, useEffect } from "react";
import { Popper, Portal } from "components";
import PropTypes from "prop-types";
import { clickOutside } from "utils";
import { PopperPlacements } from "utils/constants";
import { CSSTransition } from "react-transition-group";

import styles from "./Popover.module.scss";

export const Popover = ({ children, position, arrow, offset, selector }) => {
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

    const ele = document.querySelector(selector);

    if (!ele) return;

    targetRef.current = ele;
    ele.onclick = show;
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
          referenceElement={targetRef}
          position={position}
          offset={offset}
          arrowRect={16}
          arrow={arrow}
          render={({ popper, arrow, position, ref }) => {
            return (
              <div
                ref={ref}
                className={styles.popover}
                data-position={position}
                style={popper}
              >
                <div className={styles.menu}>
                  {children}
                  {/* {arrow && (
                  <div
                    className={styles.arrow}
                    style={arrow}
                    data-position={position}
                  ></div>
                )} */}
                </div>
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
  position: PropTypes.oneOf(PopperPlacements),
  offset: PropTypes.number,
  arrow: PropTypes.bool,
  className: PropTypes.string,
  selector: PropTypes.string.isRequired,
};

Popover.defaultProps = {
  position: "top-center",
  arrow: true,
  offset: 15,
  className: null,
};
