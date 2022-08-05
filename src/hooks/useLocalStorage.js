export const useLocalStorage = () => {
  const getValue = (key) => {
    return localStorage.getItem(key);
  };

  const setValue = ({ key, value }) => {
    if (!key || !value) return;
    localStorage.setItem(key, value);
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
