import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import { Popper, Portal } from "components";
import { classNames, clickOutside } from "utils";
import { PopperPlacements } from "utils/constants";
import { CSSTransition } from "react-transition-group";

import styles from "./DropDown.module.scss";

const DropDownContext = createContext();

export const DropDown = ({
  children,
  selector,
  placement,
  offset,
  trigger,
  className,
  strategy,
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
        <Popper
          referenceRef={targetRef}
          placement={placement}
          offset={offset}
          strategy={strategy}
          render={({ popper, position, ref }) => {
            return (
              <DropDownContext.Provider value={{ hide }}>
                <div
                  ref={ref}
                  className={styles.dropdown}
                  style={popper}
                  data-position={position}
                >
                  <div className={styles.menu}>{children}</div>
                </div>
              </DropDownContext.Provider>
            );
          }}
        />
      </CSSTransition>
    </Portal>
  );
};

DropDown.propTypes = {
  children: PropTypes.node.isRequired,
  placement: PropTypes.oneOf(PopperPlacements),
  offset: PropTypes.number,
  trigger: PropTypes.oneOf(["click", "hover"]),
  className: PropTypes.string,
  selector: PropTypes.string.isRequired,
  strategy: PropTypes.oneOf(["absolute", "fixed"]),
};

DropDown.defaultProps = {
  placement: "bottom-start",
  offset: 10,
  trigger: "click",
  className: null,
  strategy: "absolute",
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
