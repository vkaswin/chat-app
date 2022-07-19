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
import { usePopper } from "react-popper";

import styles from "./DropDown.module.scss";

const DropDownContext = createContext();

export const DropDown = ({
  children,
  selector,
  placement,
  offset,
  trigger,
  zIndex,
}) => {
  const targetRef = useRef();

  const [popper, setPopper] = useState();

  const {
    styles: { popper: popperStyle },
    attributes,
  } = usePopper(targetRef.current, popper, {
    placement: "bottom",
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

    targetRef.current = element;

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
        return targetRef.current.contains(event);
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
          enterActive: styles.dropdown_enter,
          exitActive: styles.dropdown_exit,
        }}
        onEntered={onEntered}
      >
        <div
          ref={setPopper}
          style={{ ...popperStyle, ...(zIndex && { zIndex: zIndex }) }}
          className={styles.dropdown}
          {...attributes.popper}
        >
          <div className={styles.menu}>
            <DropDownContext.Provider value={{ hide }}>
              {children}
            </DropDownContext.Provider>
          </div>
        </div>
      </CSSTransition>
    </Portal>
  );
};

DropDown.propTypes = {
  children: PropTypes.node.isRequired,
  container: PropTypes.string,
  placement: PropTypes.oneOf(PopperPlacements),
  offset: PropTypes.number,
  trigger: PropTypes.oneOf(["click", "hover"]),
  className: PropTypes.string,
  selector: PropTypes.string.isRequired,
  strategy: PropTypes.oneOf(["absolute", "fixed"]),
  zIndex: PropTypes.number,
};

DropDown.defaultProps = {
  placement: "bottom-start",
  container: null,
  offset: 10,
  trigger: "click",
  className: null,
  strategy: "absolute",
  zIndex: 1050,
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
  className: PropTypes.string,
};

Item.defaultProps = {
  className: null,
};

DropDown.Item = Item;
