import React, { useEffect, useRef, useState } from "react";
import { Portal } from "components";
import PropTypes from "prop-types";
import { PopperPlacements } from "utils/constants";
import { CSSTransition } from "react-transition-group";
import { usePopper } from "react-popper";

import styles from "./Tooltip.module.scss";

export const Tooltip = ({
  children,
  placement,
  offset,
  className,
  selector,
}) => {
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

    const ele = document.querySelector(selector);

    if (!ele) return;

    targetRef.current = ele;
    ele.onmouseenter = show;
    ele.onmouseleave = hide;
  }, []);

  return (
    <Portal>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames={{
          enterActive: styles.tooltip_enter,
          exitActive: styles.tooltip_exit,
        }}
        unmountOnExit
      >
        <div
          ref={setPopperRef}
          className={styles.tooltip}
          style={popper}
          {...attributes.popper}
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
  offset: PropTypes.arrayOf(PropTypes.number),
  arrow: PropTypes.bool,
  className: PropTypes.string,
  selector: PropTypes.string.isRequired,
};

Tooltip.defaultProps = {
  placement: "top",
  arrow: true,
  offset: [0, 10],
  className: null,
};
