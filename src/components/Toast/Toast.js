export const EventEmitter = {
  events: new Map(),

  on(eventName, callback) {
    if (this.events.has(eventName)) return;
    this.events.set(eventName, callback);
  },

  off(eventName) {
    if (!this.events.has(eventName)) return;
    this.events.delete(eventName);
  },

  emit(eventName, ...args) {
    if (!this.events.has(eventName)) return;
    this.events.get(eventName)(...args);
  },
};

export const Toast = ({
  type,
  message,
  delay,
  position = "top-right",
  pauseOnHover,
  closeIcon,
  theme,
}) => {
  EventEmitter.emit("toast", {
    id: crypto.randomUUID(),
    type,
    message,
    delay,
    position,
    pauseOnHover,
    closeIcon,
    theme,
  });
};
