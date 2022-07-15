export const useLocalStorage = () => {
  const getValue = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };

  const setValue = ({ key = "", value = "" }) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const remove = (key) => {
    localStorage.removeItem(key);
  };

  const reset = () => {
    localStorage.clear();
  };

  return {
    getItem: getValue,
    setItem: setValue,
    removeItem: remove,
    reset: reset,
  };
};
