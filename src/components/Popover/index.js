import React, { useRef, useState, useEffect } from "react";
import { Portal } from "components";
import PropTypes from "prop-types";
import { clickOutside } from "utils";
import { PopperPlacements } from "utils/constants";
import { CSSTransition } from "react-transition-group";
import { usePopper } from "react-popper";

import styles from "./Popover.module.scss";

export const Popover = ({ children, placement, offset, selector }) => {
  const targetRef = useRef();

  const [isOpen, setIsOpen] = useState(false);

  const [popperRef, setPopperRef] = useState();

  const {
    styles: { popper },
    attributes,
  } = usePopper(targetRef.current, popperRef, {
    modifiers: [{ name: "offset", options: { offset } }],
    placement,
  });

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
        <div
          ref={setPopperRef}
          className={styles.popover}
          style={popper}
          {...attributes.popper}
        >
          <div className={styles.menu}>{children}</div>
        </div>
      </CSSTransition>
    </Portal>
  );
};

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(PopperPlacements),
  offset: PropTypes.arrayOf(PropTypes.number),
  arrow: PropTypes.bool,
  className: PropTypes.string,
  selector: PropTypes.string.isRequired,
};

Popover.defaultProps = {
  placement: "top",
  arrow: true,
  offset: [0, 10],
  className: null,
};
