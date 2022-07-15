import React, { useEffect, useRef, useState } from "react";
import { Popper, Portal } from "components";
import PropTypes from "prop-types";
import { PopperPlacements } from "utils/constants";
import { CSSTransition } from "react-transition-group";

import styles from "./Tooltip.module.scss";

export const Tooltip = ({
  children,
  position,
  arrow,
  offset,
  className,
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
          referenceElement={targetRef}
          position={position}
          offset={offset}
          arrowRect={16}
          arrow={arrow}
          render={({ popper, arrow, position, ref }) => {
            return (
              <div
                ref={ref}
                className={styles.tooltip}
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

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(PopperPlacements),
  offset: PropTypes.number,
  arrow: PropTypes.bool,
  className: PropTypes.string,
  selector: PropTypes.string.isRequired,
};

Tooltip.defaultProps = {
  position: "top-center",
  arrow: true,
  offset: 10,
  className: null,
};
