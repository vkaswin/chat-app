import { useEffect, useRef, useState } from "react";

export const useButtonLoader = (buttonText = "Click Me") => {
  const [loading, setLoading] = useState(false);

  const buttonRef = useRef();

  useEffect(() => {
    if (loading) {
      buttonRef.current.disabled = true;
      buttonRef.current.innerHTML =
        'Loading <i class="fas fa-spinner fa-spin"></i>';
    } else {
      buttonRef.current.disabled = false;
      buttonRef.current.innerHTML = buttonText;
    }
  }, [loading]);

  return [buttonRef, setLoading];
};
