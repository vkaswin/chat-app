import { createPortal } from "react-dom";
import PropTypes from "prop-types";

export const Portal = ({ children, container }) => {
  if (container) {
    const element = document.querySelector(container);
    return element ? createPortal(children, element) : null;
  }
  return createPortal(children, document.body);
};

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  container: PropTypes.string,
};

Portal.defautlProps = {
  container: null,
};
