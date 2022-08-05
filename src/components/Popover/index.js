import React, { useRef, useState, useEffect } from "react";
import { Portal } from "components";
import PropTypes from "prop-types";
import { clickOutside } from "utils";
import { PopperPlacements } from "utils/constants";
import { CSSTransition } from "react-transition-group";
import { usePopper } from "hooks";

import styles from "./Popover.module.scss";

export const Popover = ({ children, placement, arrow, offset, selector }) => {
  const referenceRef = useRef();

  const [isOpen, setIsOpen] = useState(false);

  const [popperRef, setPopperRef] = useState();

  const { popper, placement: position } = usePopper({
    reference: referenceRef.current,
    popper: popperRef,
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

    const ele = document.querySelector(selector);

    if (!ele) return;

    referenceRef.current = ele;
    ele.onclick = show;
  }, []);

  const onEntered = (ele) => {
    clickOutside({
      ref: ele,
      onClose: hide,
      doNotClose: (event) => {
        return referenceRef.current.contains(event);
      },
    });
  };

  return (
    <Portal>
      <CSSTransition
        in={isOpen}
        timeout={250}
        classNames={{
          enterActive: styles.enter,
          exitActive: styles.exit,
        }}
        unmountOnExit
        onEntered={onEntered}
      >
        <div
          ref={setPopperRef}
          className={styles.container}
          data-placement={position}
          style={popper}
        >
          <div className={styles.menu}>{children}</div>
        </div>
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
  selector: "",
};
