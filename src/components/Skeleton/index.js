import React from "react";

import styles from "./Skeleton.module.scss";

export const Skeleton = ({ width, height }) => {
  return (
    <div
      className={styles.card}
      style={{
        ...(width && { "--width": width }),
        ...(height && { "--height": height }),
      }}
    ></div>
  );
};
