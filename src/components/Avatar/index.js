import React, { useMemo } from "react";
import PropTypes from "prop-types";

import styles from "./Avatar.module.scss";
import { classNames } from "utils";

export const Avatar = ({
  src,
  size,
  outline,
  status = false,
  name,
  outlineSize = 3,
  upload = false,
}) => {
  const isUrl = useMemo(() => {
    if (!src) return false;

    return src.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );
  }, [src]);

  return (
    <div
      className={classNames(styles.avatar, {
        [styles.outline]: outline,
      })}
      style={{
        "--size": `${size}px`,
        ...(outline && isUrl && { "--outline-size": `${outlineSize}px` }),
      }}
    >
      {isUrl ? (
        <img src={src} />
      ) : (
        <div className={styles.random_avatar} style={{ "--avatar-bg": src }}>
          <span>
            {name?.charAt(0)}
            {name?.split(" ")?.[1]?.charAt(0) ?? ""}
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
  name: PropTypes.string,
};

Avatar.defaultProps = {
  src: null,
  size: 50,
  outline: false,
  status: false,
  name: "",
};