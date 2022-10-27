import React, { useEffect, useRef } from "react";
import { debounce } from "utils";

import styles from "./SearchBox.module.scss";

export const SearchBox = ({ title, placeholder, onChange }) => {
  let inputRef = useRef();

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleKeyDown = (e) => {
    let { ctrlKey, keyCode } = e;

    if (ctrlKey && keyCode === 70) {
      e.preventDefault();
      inputRef.current.focus();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <b>{title}</b>
        <button>
          <i className="bx-plus"></i>
        </button>
      </div>
      <div className={styles.search}>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          onChange={debounce(onChange, 500)}
        />
        <button>
          <i className="bx-search"></i>
        </button>
      </div>
    </div>
  );
};
