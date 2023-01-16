import { createPortal } from "react-dom";

export const Portal = ({ children, container = null }) => {
  if (container) {
    const element = document.querySelector(container);
    return element ? createPortal(children, element) : null;
  }
  return createPortal(children, document.body);
};
