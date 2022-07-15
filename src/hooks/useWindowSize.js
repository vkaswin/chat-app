import React, { useState, useEffect } from "react";

export const useWindowSize = () => {
  const { innerWidth, innerHeight } = window;

  const [windowSize, setWindowSize] = useState({
    width: innerWidth,
    height: innerHeight,
  });

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = ({ target: { innerWidth, innerHeight } }) => {
    setWindowSize({ ...windowSize, width: innerWidth, height: innerHeight });
  };

  return { width: windowSize.width, height: windowSize.height };
};
