import React from "react";
import PropTypes from "prop-types";

import styles from "./Avatar.module.scss";

export const Avatar = ({ src, size, outline, status }) => {
  return (
    <div className={styles.avatar} style={{ "--size": `${size}px` }}>
      {outline ? (
        <img src={src} className={styles.outline} />
      ) : (
        <img src={src} />
      )}
      {status && <div className={styles.status}></div>}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.number,
  outline: PropTypes.bool,
  status: PropTypes.bool,
};

Avatar.defaultProps = {
  src: "https://themesbrand.com/doot/layouts/assets/images/users/avatar-2.jpg",
  size: 50,
  outline: false,
  status: false,
};
