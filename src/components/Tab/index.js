import React, { useLayoutEffect, useRef, useState } from "react";
import { classNames } from "utils";

import "./Tab.scss";

export const Tab = ({ tab = 0, children }) => {
  let [width, setWidth] = useState();
  let [left, setLeft] = useState();
  let tabRef = useRef();

  useLayoutEffect(() => {
    setLeft(tabRef.current.children[tab]?.offsetLeft);
    setWidth(tabRef.current.children[tab]?.offsetWidth);
  }, [tab]);

  return (
    <div className="tab-container">
      <div className="tab-wrapper" ref={tabRef}>
        {children}
        <span
          className="tab-indicator"
          style={{ left: left, width: width }}
        ></span>
      </div>
    </div>
  );
};

const Item = ({ className, children, onClick }) => {
  return (
    <div
      className={classNames("tab-item", {
        [className]: className,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

Tab.Item = Item;
