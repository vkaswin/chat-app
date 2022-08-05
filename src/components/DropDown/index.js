import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import { Portal } from "components";
import { classNames, clickOutside } from "utils";
import { PopperPlacements } from "utils/constants";
import { CSSTransition } from "react-transition-group";
import { usePopper } from "hooks";

import styles from "./DropDown.module.scss";

const DropDownContext = createContext();

export const DropDown = ({
  children,
  selector,
  placement,
  trigger,
  className,
  zIndex,
}) => {
  const referenceRef = useRef();
  const [popperRef, setPopperRef] = useState();

  const { popper, placement: position } = usePopper({
    popper: popperRef,
    reference: referenceRef.current,
    placement,
  });

  const [isOpen, setIsOpen] = useState(false);

  const show = () => {
    setIsOpen(true);
  };

  const hide = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (selector.length === 0) return;

    const element = document.querySelector(selector);

    if (!element) return;

    referenceRef.current = element;

    if (trigger === "hover") {
      element.onmouseenter = show;
      element.onmouseleave = hide;
    } else {
      element.onclick = show;
    }
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
        timeout={200}
        unmountOnExit
        classNames={{
          enterActive: styles.enter,
          exitActive: styles.exit,
        }}
        onEntered={onEntered}
      >
        <DropDownContext.Provider value={{ hide }}>
          <div
            ref={setPopperRef}
            className={styles.container}
            style={{ ...popper, ...(zIndex && { zIndex }) }}
            data-placement={position}
          >
            <div className={styles.menu}>{children}</div>
          </div>
        </DropDownContext.Provider>
      </CSSTransition>
    </Portal>
  );
};

DropDown.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(PopperPlacements),
  offset: PropTypes.number,
  trigger: PropTypes.oneOf(["click", "hover"]),
  className: PropTypes.string,
  selector: PropTypes.string.isRequired,
  zIndex: PropTypes.number,
};

DropDown.defaultProps = {
  position: "bottom-start",
  offset: 10,
  trigger: "click",
  className: null,
  selector: "",
  zIndex: null,
};

const Item = ({ children, onClick, className }) => {
  const { hide } = useContext(DropDownContext);

  const handleClick = () => {
    hide();
    if (typeof onClick === "function") onClick();
  };

  return (
    <button
      className={classNames(styles.item, className)}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

Item.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

DropDown.Item = Item;
