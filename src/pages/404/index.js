import React from "react";
import { useRouter } from "hooks";

import styles from "./NotFound.module.scss";

const PageNotFound = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>oops! Page not found</h1>
        <span>The page you are looking for doesn’t exist</span>
        <button onClick={() => router.goBack()}>Go Back</button>
      </div>
    </div>
  );
};

export default PageNotFound;
