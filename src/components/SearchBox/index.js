import React from "react";
import { debounce } from "utils";

import styles from "./SearchBox.module.scss";

export const SearchBox = ({ title, placeholder, onChange }) => {
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
