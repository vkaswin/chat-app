import React, { useState, useEffect, useMemo } from "react";
import { Portal } from "components";
import { ToastCard } from "../ToastCard";
import { EventEmitter } from "../Toast";

import "./ToastContainer.scss";

const defaultPositions = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

export const ToastContainer = () => {
  let [toast, setToast] = useState([]);

  useEffect(() => {
    EventEmitter.on("toast", handleEventEmitter);
    return () => EventEmitter.off("toast");
  }, []);

  const handleEventEmitter = (event) => {
    let { position } = event;
    if (!defaultPositions.includes(position)) return;
    setToast((prev) => [...prev, event]);
  };

  const clearToast = (toastId) => {
    setToast((prev) => prev.filter(({ id }) => id !== toastId));
  };

  const toasts = useMemo(() => {
    return defaultPositions.map((placement) =>
      toast.filter(({ position }) => placement == position)
    );
  }, [toast]);

  return (
    <Portal>
      {toasts.map((item, index) => {
        if (item.length === 0) return null;
        return (
          <div
            key={index}
            className="rc-toast-container"
            data-position={defaultPositions[index]}
          >
            {item.map((list) => {
              let { id } = list;
              return <ToastCard key={id} {...list} clearToast={clearToast} />;
            })}
          </div>
        );
      })}
    </Portal>
  );
};
