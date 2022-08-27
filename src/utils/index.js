export const debounce = (fn, delay) => {
  let timeoutID;
  return (...args) => {
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export const parseQuery = (query = "") => {
  if (query.length == 0) return {};

  return query
    .substring(1)
    .split("&")
    .reduce((initial, str) => {
      const [key, value] = str.split("=");
      return { ...initial, [key]: value };
    }, {});
};

export const stringifyQuery = (query = {}) => {
  return Object.entries(query)
    .reduce(
      (initial, [key, value]) =>
        `${initial}${
          typeof value !== "undefined" && value !== null
            ? `${key}=${value}&`
            : ""
        }`,
      "?"
    )
    .slice(0, -1);
};

export const classNames = (...args) => {
  const getDateType = (data) => {
    if (typeof data !== "object") {
      return typeof data;
    }

    return Object.prototype.toString
      .call(data)
      .toLowerCase()
      .replace(/^\[object (\S+)\]$/, "$1");
  };

  return String(
    args.reduce((initial, className) => {
      if (typeof className === "string") {
        return `${initial} ${className}`;
      }

      const type = getDateType(className);

      if (type === "object") {
        return Object.entries(className)
          .filter(([_, value]) => Boolean(value))
          .reduce((initial, [key, _]) => `${initial} ${key}`, initial);
      }

      return initial;
    }, "")
  ).trim();
};

export const clickOutside = ({ ref, onClose, doNotClose = () => false }) => {
  if (!ref) return;

  const handleClickOutside = ({ target }) => {
    if (ref.contains(target) || doNotClose(target)) return;
    onClose();
    document.removeEventListener("click", handleClickOutside);
  };

  document.addEventListener("click", handleClickOutside);
};

export const getScrollParent = (node) => {
  if (node == null) {
    return null;
  }

  if (node.scrollHeight > node.clientHeight) {
    return node;
  } else {
    return getScrollParent(node.parentNode);
  }
};

export const cookies = () => {
  const set = ({ name, value, days }) => {
    let expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + days * 24 * 60 * 60 * 1000);
    let expires = "; expires=" + expireDate.toUTCString();
    document.cookie = name + "=" + JSON.stringify(value) + expires + "; path=/";
  };

  const get = (name) => {
    let match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));

    return match ? match[2] : null;
  };

  const remove = (name) => {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };

  return {
    set,
    get,
    remove,
  };
};

export const localStorage = () => {
  const get = (key) => {
    return window.localStorage.getItem(key);
  };

  const set = ({ key, value }) => {
    if (!key || !value) return;
    window.localStorage.setItem(key, value);
  };

  const remove = (key) => {
    window.localStorage.removeItem(key);
  };

  const reset = () => {
    window.localStorage.clear();
  };

  return {
    get,
    set,
    remove,
    reset,
  };
};

export const sessionStorage = () => {
  const get = (key) => {
    return JSON.parse(window.sessionStorage.getItem(key));
  };

  const set = ({ key = "", value = "" }) => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  };

  const remove = (key) => {
    window.sessionStorage.removeItem(key);
  };

  const reset = () => {
    window.sessionStorage.clear();
  };

  return {
    get,
    set,
    remove,
    reset,
  };
};

export const generateRandomColor = () => {
  const colors = [
    "#EF4770",
    "#6F6F6F",
    "#DCB604",
    "#199393",
    "#029ACD",
    "#11C1DA",
    "#3B8FFC",
    "#18C6A0",
    "#B387FF",
    "#F75334",
  ];

  let index = Math.floor(Math.random() * colors.length);
  return colors[index];
};
