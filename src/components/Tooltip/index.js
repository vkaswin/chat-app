import React, { useEffect, useRef, useState } from "react";
import { Popper, Portal } from "components";
import PropTypes from "prop-types";
import { PopperPlacements } from "utils/constants";
import { CSSTransition } from "react-transition-group";

import styles from "./Tooltip.module.scss";

export const Tooltip = ({
  children,
  placement,
  arrow,
  offset,
  className,
  strategy,
  selector,
}) => {
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
        <Popper
          referenceRef={targetRef}
          placement={placement}
          offset={offset}
          strategy={strategy}
          arrow={arrow}
          render={({ popper, placement, ref }) => {
            return (
              <div
                ref={ref}
                className={styles.tooltip}
                data-placement={placement}
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

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(PopperPlacements),
  offset: PropTypes.number,
  arrow: PropTypes.bool,
  className: PropTypes.string,
  selector: PropTypes.string.isRequired,
  strategy: PropTypes.oneOf(["absolute", "fixed"]),
};

Tooltip.defaultProps = {
  placement: "top-center",
  arrow: true,
  offset: 10,
  strategy: "absolute",
  className: null,
};
