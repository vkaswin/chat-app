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
  type = null,
  message = null,
  delay = 3000,
  position = "top-right",
  pauseOnHover = true,
  closeIcon = true,
  theme = "light",
}) => {
  if (!type || !message) return;
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
