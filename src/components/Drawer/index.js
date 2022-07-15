import React, { useEffect, useState } from "react";
import { Portal, Overlay } from "components";
import PropTypes from "prop-types";
import { classNames } from "utils";

import "./Drawer.scss";

export const Drawer = ({ position, isOpen, toggle, children, className }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setShow(isOpen);
  }, [isOpen]);

  const handleAnimationEnd = ({ animationName }) => {
    if (String(animationName).includes("slideOut")) {
      setShow(false);
    }
  };

  if (!show) return;

  return (
    <Portal>
      <div>
        <div
          className={classNames("rc-drawer", {
            show: isOpen,
            [className]: className,
          })}
          data-position={position}
          onAnimationEnd={handleAnimationEnd}
        >
          {children}
        </div>
        <Overlay isOpen={isOpen} toggle={toggle} zIndex={1049} portal={false} />
      </div>
    </Portal>
  );
};

Drawer.propType = {
  isOpen: PropTypes.bool,
  position: PropTypes.oneOf(["left", "right", "bottom", "top"]),
  toggle: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  portal: PropTypes.bool,
};

Drawer.defaultProps = {
  isOpen: false,
  position: "left",
  className: "",
  portal: true,
  toggle: () => {},
};
