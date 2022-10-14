import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Portal } from "components";
import { classNames, clickOutside } from "utils";
import { CSSTransition } from "react-transition-group";
import { usePopper } from "hooks";

import styles from "./DropDown.module.scss";

const DropDownContext = createContext();

export const DropDown = ({
  children,
  selector = "",
  placement = "bottom-start",
  trigger = "click",
  className = null,
  isOpen = null,
  toggle = () => {},
  zIndex = null,
  offset = 10,
}) => {
  const referenceRef = useRef();
  const [popperRef, setPopperRef] = useState();

  const { popper, placement: position } = usePopper({
    popper: popperRef,
    reference: referenceRef.current,
    placement,
  });

  const [show, setShow] = useState(false);

  const open = () => {
    console.log("dropdown");
    setShow(true);
  };

  const close = () => {
    setShow(false);
  };

  useEffect(() => {
    if (selector.length === 0) return;

    const element = document.querySelector(selector);

    if (!element) return;

    referenceRef.current = element;

    if (trigger === "hover") {
      element.onmouseenter = typeof isOpen === "boolean" ? toggle : open;
      element.onmouseleave = typeof isOpen === "boolean" ? toggle : close;
    } else {
      element.onclick = typeof isOpen === "boolean" ? toggle : open;
    }
  }, []);

  const onEntered = (ele) => {
    clickOutside({
      ref: ele,
      onClose: typeof isOpen === "boolean" ? toggle : close,
      doNotClose: (event) => {
        return referenceRef.current.contains(event);
      },
    });
  };

  return (
    <Portal>
      <CSSTransition
        in={typeof isOpen === "boolean" ? isOpen : show}
        timeout={200}
        unmountOnExit
        classNames={{
          enterActive: styles.enter,
          exitActive: styles.exit,
        }}
        onEntered={onEntered}
      >
        <DropDownContext.Provider
          value={{ close: typeof isOpen === "boolean" ? toggle : close }}
        >
          <div
            ref={setPopperRef}
            className={styles.container}
            style={{ ...popper, ...(zIndex && { zIndex }) }}
            data-placement={position}
          >
            <div className={classNames(styles.menu, className)}>{children}</div>
          </div>
        </DropDownContext.Provider>
      </CSSTransition>
    </Portal>
  );
};

export const DropDownItem = ({ children, onClick, className }) => {
  const { close } = useContext(DropDownContext);

  const handleClick = () => {
    close();
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
