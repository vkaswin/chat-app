import React, { useEffect, useRef, useState } from "react";
import { getScrollParent } from "utils";

import styles from "./ScrollBar.module.scss";

export const ScrollBar = () => {
  const scrollParent = useRef();

  const scrollBarRef = useRef();

  const [left, setLeft] = useState(0);

  const [top, setTop] = useState(0);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = getScrollParent(scrollBarRef.current);
    if (!(element instanceof HTMLElement)) return;

    const { scrollHeight, clientHeight } = element;

    const rect = element.getBoundingClientRect();
    const left = rect.x + rect.width - 5;
    const barHeight = (clientHeight / scrollHeight) * clientHeight;

    scrollBarRef.current.setAttribute(
      "style",
      `left:${left}px; top: 0px; height:${barHeight}px;`
    );

    element.onscroll = handleScroll;
    element.onmouseenter = handleMouseEnter;
    element.onmouseleave = handleMouseLeave;
    element.onpointerdown = handlePointerDown;
    element.onpointerup = handlePointerUp;
    window.addEventListener("resize", handleResize);

    scrollParent.current = element;

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    const { scrollHeight, clientHeight, scrollTop } = scrollParent.current;
    const {
      style: { left },
    } = scrollBarRef.current;

    const top = (scrollTop / scrollHeight) * clientHeight;
    const barHeight = (clientHeight / scrollHeight) * clientHeight;

    scrollBarRef.current.setAttribute(
      "style",
      `left:${left}; top:${top}px; height:${barHeight}px`
    );
  };

  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = scrollParent.current;

    const {
      style: { left },
    } = scrollBarRef.current;

    const top = (scrollTop / scrollHeight) * clientHeight;
    const barHeight = (clientHeight / scrollHeight) * clientHeight;

    scrollBarRef.current.setAttribute(
      "style",
      `left:${left}; top:${top}px; height:${barHeight}px`
    );
  };

  const handlePointerDown = ({ pointerId }) => {
    scrollBarRef.current.addEventListener("pointermove", handlePointerMove);
    scrollBarRef.current.setPointerCapture(pointerId);
  };

  const handlePointerMove = (e) => {
    // console.log(e);
    const { clientY } = e;
    const top = `${clientY}`;
    console.log(top);
    scrollParent.current.scrollTo({ top });
  };

  const handlePointerUp = ({ pointerId }) => {
    scrollBarRef.current.removeEventListener("pointermove", handlePointerMove);
    scrollBarRef.current.releasePointerCapture(pointerId);
  };

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div
      ref={scrollBarRef}
      className={styles.bar}
      aria-hidden={isVisible}
    ></div>
  );
};
