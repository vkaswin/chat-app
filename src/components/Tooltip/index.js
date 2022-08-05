import React, { useEffect, useRef, useState } from "react";
import { Portal } from "components";
import PropTypes from "prop-types";
import { PopperPlacements } from "utils/constants";
import { CSSTransition } from "react-transition-group";
import { usePopper } from "hooks";

import styles from "./Tooltip.module.scss";

export const Tooltip = ({ children, placement, className, selector }) => {
  const referenceRef = useRef();

  const [popperRef, setPopperRef] = useState();

  const [isOpen, setIsOpen] = useState(false);

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
    ele.onmouseenter = show;
    ele.onmouseleave = hide;
  }, []);

  return (
    <Portal>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames={{
          enterActive: styles.enter,
          exitActive: styles.exit,
        }}
        unmountOnExit
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

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(PopperPlacements),
  offset: PropTypes.number,
  arrow: PropTypes.bool,
  className: PropTypes.string,
  selector: PropTypes.string.isRequired,
};

Tooltip.defaultProps = {
  placement: "top-center",
  arrow: true,
  offset: 10,
  className: null,
  selector: "",
};
