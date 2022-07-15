import React, { useEffect, useState } from "react";
import { Portal, Overlay } from "components";
import { classNames } from "utils";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

import "./Modal.scss";

export const Modal = ({ isOpen, toggle, children }) => {
  return (
    <CSSTransition in={isOpen} unmountOnExit timeout={300} classNames="modal">
      <Portal>
        <div>
          <div
            className="rc-modal"
            onClick={() => {
              isOpen && toggle();
            }}
          >
            <div className="rc-modal-dialog">
              <div
                className="rc-modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                {children}
              </div>
            </div>
          </div>
          <Overlay isOpen={isOpen} toggle={toggle} zIndex={1049} />
        </div>
      </Portal>
    </CSSTransition>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  children: PropTypes.node,
};

Modal.defaultProps = {
  isOpen: false,
  toggle: () => {},
};
