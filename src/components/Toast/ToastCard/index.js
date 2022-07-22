import React, { useMemo, useRef } from "react";
import PropTypes from "prop-types";

import "./ToastCard.scss";

export const ToastCard = ({
  id,
  type,
  message,
  delay = 3000,
  closeIcon,
  pauseOnHover,
  theme,
  clearToast,
}) => {
  let toastRef = useRef();

  let progressRef = useRef();

  const toastIcon = useMemo(() => {
    switch (type) {
      case "success":
        return "bxs-check-circle";
      case "error":
        return "bxs-x-circle";
      case "warning":
        return "bxs-error-circle";
      case "info":
        return "bxs-info-circle";
      default:
        return;
    }
  }, []);

  const handleMouseEnter = () => {
    progressRef.current.style["animation-play-state"] = "paused";
  };

  const handleMouseLeave = () => {
    progressRef.current.style["animation-play-state"] = "running";
  };

  const handleAnimationEnd = ({ animationName }) => {
    if (animationName == "rc_trackProgress") {
      hideToast();
    }
  };

  const hideToast = () => {
    toastRef.current.classList.add("hide");
    setTimeout(() => {
      clearToast(id);
    }, 500);
  };

  return (
    <div
      ref={toastRef}
      className="toast"
      onMouseEnter={pauseOnHover && handleMouseEnter}
      onMouseLeave={pauseOnHover && handleMouseLeave}
      data-theme={theme}
      data-type={type}
    >
      <div className="icon">
        <i className={toastIcon}></i>
      </div>
      <div>
        <span>{message}</span>
      </div>
      {closeIcon && (
        <button onClick={hideToast}>
          <i className="bx-x"></i>
        </button>
      )}
      <div
        ref={progressRef}
        className="progress"
        style={{ "--progress-animation": `${delay}ms` }}
        onAnimationEnd={handleAnimationEnd}
      ></div>
    </div>
  );
};

ToastCard.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
  message: PropTypes.string.isRequired,
  delay: PropTypes.number,
  closeIcon: PropTypes.bool,
  pauseOnHover: PropTypes.bool,
  theme: PropTypes.oneOf(["light", "dark", "coloured"]),
};

ToastCard.defaultProps = {
  type: "info",
  delay: 3000,
  closeIcon: true,
  pauseOnHover: true,
  theme: "light",
};
