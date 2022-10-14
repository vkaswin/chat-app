import { useEffect, useState } from "react";
import { Popper } from "components/Popper";

export const usePopper = ({ reference, placement, popper }) => {
  let [state, setState] = useState({ popper: {}, placement });

  useEffect(() => {
    if (!(reference instanceof HTMLElement) || !(popper instanceof HTMLElement))
      return;

    const popperInstance = new Popper({
      reference,
      popper,
      placement,
      onPositionChange,
    });

    return () => popperInstance.destroy();
  }, [reference, popper]);

  const onPositionChange = ({ popper, placement }) => {
    setState({ ...state, popper, placement });
  };

  return state;
};
