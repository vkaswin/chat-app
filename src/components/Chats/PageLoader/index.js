import React from "react";
import { Skeleton } from "components";

import styles from "./PageLoader.module.scss";

export const PageLoader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
};
