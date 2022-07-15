import React from "react";
import PropTypes from "prop-types";
import { classNames } from "utils";

import "./Overlay.scss";

export const Overlay = ({ isOpen, toggle, zIndex }) => {
  return (
    <div
      style={{ "--overlay-zindex": zIndex }}
      className={classNames("rc-overlay", { show: isOpen })}
      onClick={() => {
        isOpen && toggle();
      }}
    ></div>
  );
};

Overlay.propTypes = {
  isOpen: PropTypes.bool,
  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  toggle: () => {},
};

Overlay.defaultProps = {
  zIndex: 1025,
  isOpen: false,
  toggle: () => {},
};
