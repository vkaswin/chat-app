import React, { useMemo } from "react";
import PropTypes from "prop-types";

import styles from "./Avatar.module.scss";
import { classNames } from "utils";

export const Avatar = ({
  src,
  size,
  outline,
  status = false,
  userName,
  outlineSize = 3,
  upload = false,
}) => {
  const colors = [
    "#EF4770",
    "#4eac6e",
    "#6F6F6F",
    "#DCB604",
    "#199393",
    "#029ACD",
  ];

  const getRandomColor = useMemo(() => {
    let index = Math.floor(Math.random() * colors.length);
    return colors[index];
  }, []);

  return (
    <div
      className={classNames(styles.avatar, {
        [styles.outline]: outline,
      })}
      style={{
        "--size": `${size}px`,
        ...(outline && { "--outline-size": `${outlineSize}px` }),
      }}
    >
      {src ? (
        <img src={src} />
      ) : (
        <div
          className={styles.random_avatar}
          style={{ "--avatar-bg": getRandomColor }}
        >
          <span>
            {userName?.charAt(0)}
            {userName?.split(" ")?.[1]?.charAt(0) ?? ""}
          </span>
        </div>
      )}
      {status && <div className={styles.status}></div>}
      {upload && (
        <div className={styles.upload}>
          <i className="bxs-camera"></i>
        </div>
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.number,
  outline: PropTypes.bool,
  status: PropTypes.bool,
};

Avatar.defaultProps = {
  src: null,
  size: 50,
  outline: false,
  status: false,
};
