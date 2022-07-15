import { useEffect, useRef, useState } from "react";

export const useObserver = () => {
  let observerRef = useRef();

  let [isVisible, setIsVisible] = useState(false);

  const options = { root: null, rootMargin: "0px", threshold: 1 };

  useEffect(() => {
    let observer = new IntersectionObserver(handleObserver, options);
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  const handleObserver = ([event]) => {
    setIsVisible(event.isIntersecting);
  };

  return { observerRef, isVisible };
};
