import React from "react";
import { classNames } from "utils";

import styles from "./PageLoader.module.scss";

export const PageLoader = () => {
  const cardWidth = ["35%", "40%", "45%", "50%"];

  const skeleton = Array.from(
    { length: 10 },
    () => cardWidth[Math.floor(Math.random() * cardWidth.length)]
  );

  return (
    <div className={styles.container}>
      {skeleton.map((width, index) => {
        return (
          <div
            key={index}
            className={classNames(styles.card, index % 2 === 0 && styles.end)}
            style={{
              "--width": width,
            }}
          >
            <div className={`${styles.line} skeleton`}></div>
            <div className={`${styles.line} skeleton`}></div>
          </div>
        );
      })}
    </div>
  );
};
