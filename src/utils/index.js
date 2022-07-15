import { Toast } from "components";

export const toast = ({ type, message, delay, position, closeIcon }) => {
  Toast({
    type,
    message,
    delay,
    position,
    closeIcon,
  });
};

export const debounce = (fn, delay) => {
  let timeoutID;
  return (...args) => {
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export const getBoundingClientRect = (element) => {
  let rect = element.getBoundingClientRect();
  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width,
    x: rect.x,
    y: rect.y,
  };
};

export const setCookie = ({ name, value, days }) => {
  let expireDate = new Date();
  expireDate.setTime(expireDate.getTime() + days * 24 * 60 * 60 * 1000);
  let expires = "; expires=" + expireDate.toUTCString();
  document.cookie = name + "=" + value + expires + "; path=/";
};

export const getCookie = (name) => {
  let match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));

  return match ? match[2] : null;
};

export const clearCookie = (name) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
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

const getDateType = (data) => {
  if (typeof data !== "object") {
    return typeof data;
  }

  return Object.prototype.toString
    .call(data)
    .toLowerCase()
    .replace(/^\[object (\S+)\]$/, "$1");
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

//? Select a random element in an array
// const getRandomElement = (array) => {
//   if (!Array.isArray(array)) return;

//   return Math.floor(Math.random() * array.length);
// };

//? Sort by name
// const sortData = dataSet.sort((curr, prev) => {
//   return curr.label.localeCompare(prev.label);
// });

//? Generate unique id
// const uuidv4 = () => {
//   return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
//     (
//       c ^
//       (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
//     ).toString(16)
//   );
// };

//? Get day by date
// const getDayByDate = ({ year, month, day }) => {
//   return new Date(year, month, day).toLocaleDateString("en-us", {
//     weekday: "long",
//   });
// };
