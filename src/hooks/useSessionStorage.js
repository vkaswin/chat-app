export const useSessionStorage = () => {
  const getValue = (key) => {
    return JSON.parse(sessionStorage.getItem(key));
  };

  const setValue = ({ key = "", value = "" }) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  const remove = (key) => {
    sessionStorage.removeItem(key);
  };

  const reset = () => {
    sessionStorage.clear();
  };

  return {
    getItem: getValue,
    setItem: setValue,
    removeItem: remove,
    reset: reset,
  };
};
