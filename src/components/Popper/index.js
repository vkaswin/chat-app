import { useEffect, useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { PopperPlacements } from "utils/constants";

export const Popper = ({
  render,
  referenceElement,
  position,
  offset,
  arrow,
  arrowRect,
}) => {
  const popperElement = useRef();

  const [state, setState] = useState({
    popper: {
      position: "absolute",
      inset: "0px auto auto 0px",
    },
    arrow: {
      position: "absolute",
    },
    position,
  });

  const gap = 5;

  useLayoutEffect(() => {
    handlePopper();
  }, [referenceElement.current]);

  useEffect(() => {
    window.addEventListener("resize", handlePopper);
    return () => window.removeEventListener("resize", handlePopper);
  }, []);

  const ref = (element) => {
    popperElement.current = element;
  };

  const handlePopper = () => {
    const reference = referenceElement.current?.getBoundingClientRect();

    const popper = popperElement.current?.getBoundingClientRect();

    const { innerWidth, innerHeight } = window;

    const args = {
      reference,
      popper,
      innerWidth,
      innerHeight,
    };

    const popperRect = popperPositions[position]?.(args);

    if (popperRect) {
      setPopperPosition(popperRect);
    } else {
      autoPlacement(args);
    }
  };

  const popperPositions = {
    "left-center": (args) => placeOnLeftCenter(args),
    "left-start": (args) => placeOnLeftStart(args),
    "left-end": (args) => placeOnLeftEnd(args),
    "right-start": (args) => placeOnRightStart(args),
    "right-center": (args) => placeOnRightCenter(args),
    "right-end": (args) => placeOnRightEnd(args),
    "top-start": (args) => placeOnTopStart(args),
    "top-center": (args) => placeOnTopCenter(args),
    "top-end": (args) => placeOnTopEnd(args),
    "bottom-start": (args) => placeOnBottomStart(args),
    "bottom-center": (args) => placeOnBottomCenter(args),
    "bottom-end": (args) => placeOnBottomEnd(args),
  };

  const canPlaceOnLeft = ({ reference, popper }) => {
    return reference.x - offset > popper.width;
  };

  const canPlaceOnRight = ({ reference, popper, innerWidth }) => {
    return innerWidth - (reference.x + reference.width + offset) > popper.width;
  };

  const canPlaceOnTop = ({ reference, popper }) => {
    return reference.y > popper.height;
  };

  const canPlaceOnBottom = ({ reference, popper, innerHeight }) => {
    let bottom = innerHeight - (reference.y + reference.height + offset);
    return bottom > popper.height;
  };

  const placeOnLeftStart = (args) => {
    if (!canPlaceOnLeft(args)) return false;
    const { reference, popper, innerHeight } = args;
    let bottom = innerHeight - reference.y;
    let left = reference.x - popper.width - offset;
    let top =
      popper.height > bottom
        ? Math.max(reference.y - (popper.height - bottom + 10), 10)
        : reference.y;
    return {
      popper: {
        x: left,
        y: top,
      },
      ...(arrow && {
        arrow: {
          x: reference.x,
          y: reference.y + gap,
        },
      }),
    };
  };

  const placeOnLeftCenter = (args) => {
    if (!canPlaceOnLeft(args)) return false;
    const { reference, popper } = args;
    let left = reference.x - popper.width - offset;
    let top = Math.max(
      reference.y - (popper.height / 2 - reference.height / 2),
      10
    );
    return {
      popper: {
        x: left,
        y: top,
      },
      ...(arrow && {
        arrow: {
          x: reference.x,
          y: reference.y + (reference.height / 2 - arrowRect / 2),
        },
      }),
    };
  };

  const placeOnLeftEnd = (args) => {
    if (!canPlaceOnLeft(args)) return false;
    const { reference, popper } = args;
    let left = reference.x - popper.width - offset;
    let top = Math.max(reference.y - (popper.height - reference.height), 10);
    return {
      popper: {
        x: left,
        y: top,
      },
      ...(arrow && {
        arrow: {
          x: reference.x,
          y: reference.y + reference.height - arrowRect - gap,
        },
      }),
    };
  };

  const placeOnRightStart = (args) => {
    if (!canPlaceOnRight(args)) return false;
    const { reference, popper, innerHeight } = args;
    let bottom = innerHeight - (reference.y + reference.height);
    let left = reference.x + reference.width + offset;
    let top = Math.max(
      popper.height > bottom ? bottom - popper.height : reference.y,
      10
    );
    return {
      popper: {
        x: left,
        y: top,
      },
      ...(arrow && {
        arrow: {
          x: reference.x + reference.width,
          y: reference.y + gap,
        },
      }),
    };
  };

  const placeOnRightCenter = (args) => {
    if (!canPlaceOnRight(args)) return false;
    const { reference, popper } = args;
    let left = reference.x + reference.width + offset;
    let top = Math.max(
      reference.y - (popper.height / 2 - reference.height / 2),
      10
    );
    return {
      popper: {
        x: left,
        y: top,
      },
      ...(arrow && {
        arrow: {
          x: reference.x + reference.width,
          y: reference.y + (reference.height / 2 - arrowRect / 2),
        },
      }),
    };
  };

  const placeOnRightEnd = (args) => {
    if (!canPlaceOnRight(args)) return false;
    const { reference, popper } = args;
    let left = reference.x + reference.width + offset;
    let top = Math.max(reference.y - (popper.height - reference.height), 10);
    return {
      popper: {
        x: left,
        y: top,
      },
      ...(arrow && {
        arrow: {
          x: reference.x + reference.width,
          y: reference.y + reference.height - arrowRect - gap,
        },
      }),
    };
  };

  const placeOnTopStart = (args) => {
    if (!canPlaceOnTop(args)) return false;
    const { reference, popper, innerWidth } = args;
    let right = innerWidth - reference.x;
    let left =
      right < popper.width
        ? Math.max(reference.x - (popper.width - right + 10), 10)
        : reference.x;
    let top = reference.y - (popper.height + offset);
    return {
      popper: {
        x: left,
        y: top,
      },
      ...(arrow && {
        arrow: {
          x: reference.x + gap,
          y: reference.y,
        },
      }),
    };
  };

  const placeOnTopCenter = (args) => {
    if (!canPlaceOnTop(args)) return false;
    const { reference, popper, innerWidth } = args;
    let right = innerWidth - reference.x;
    let left =
      right < popper.width
        ? Math.max(reference.x - (popper.width - right + offset), 10)
        : Math.max(reference.x + (reference.width / 2 - popper.width / 2), 10);
    let top = reference.y - (popper.height + offset);
    return {
      popper: {
        x: left,
        y: top,
      },
      ...(arrow && {
        arrow: {
          x: reference.x + (reference.width / 2 - arrowRect / 2),
          y: reference.y,
        },
      }),
    };
  };

  const placeOnTopEnd = (args) => {
    if (!canPlaceOnTop(args)) return false;
    const { reference, popper } = args;
    let left = Math.max(reference.x - (popper.width - reference.width), 10);
    let top = reference.y - (popper.height + offset);
    return {
      popper: {
        x: left,
        y: top,
      },
      ...(arrow && {
        arrow: {
          x: reference.x + reference.width - arrowRect - gap,
          y: reference.y,
        },
      }),
    };
  };

  const placeOnBottomStart = (args) => {
    const { reference, popper, innerWidth, isDefault = false } = args;
    if (isDefault || !canPlaceOnBottom(args)) return false;
    let right = innerWidth - reference.x;
    let minValue = window.innerWidth - popper.width - offset - 10;
    let left =
      right < popper.width
        ? Math.min(
            Math.max(reference.x - (popper.width - right + offset), 10),
            minValue
          )
        : reference.x;
    let top = reference.y + reference.height + offset;
    return {
      popper: {
        x: left,
        y: top,
      },
      ...(arrow && {
        arrow: { x: reference.x + gap, y: reference.y + reference.height },
      }),
    };
  };

  const placeOnBottomCenter = (args) => {
    if (!canPlaceOnBottom(args)) return false;
    const { reference, popper, innerWidth } = args;
    let right = innerWidth - reference.x;
    let minValue = window.innerWidth - popper.width - offset - 10;
    let left =
      right < popper.width
        ? Math.min(
            Math.max(reference.x - (popper.width - right + offset), 10),
            minValue
          )
        : Math.max(reference.x + (reference.width / 2 - popper.width / 2), 10);
    let top = reference.y + reference.height + offset;
    return {
      popper: {
        x: left,
        y: top,
      },
      ...(arrow && {
        arrow: {
          x: reference.x + (reference.width / 2 - arrowRect / 2),
          y: reference.y + reference.height,
        },
      }),
    };
  };

  const placeOnBottomEnd = (args) => {
    if (!canPlaceOnBottom(args)) return false;
    const { reference, popper } = args;
    let left = Math.max(reference.x - (popper.width - reference.width), 10);
    let top = reference.y + reference.height + offset;
    return {
      popper: {
        x: left,
        y: top,
      },
      ...(arrow && {
        arrow: {
          x: reference.x + reference.width - arrowRect - gap,
          y: reference.y + reference.height,
        },
      }),
    };
  };

  const getPosition = (args) => {
    const [placement] = position.split("-");
    switch (placement) {
      case "left":
        return canPlaceOnLeft(args) && "left-center";
      case "right":
        return canPlaceOnRight(args) && "right";
      case "top":
        return canPlaceOnTop(args) && "top";
      case "bottom":
        return canPlaceOnBottom(args) && "bottom";
      default:
        return false;
    }
  };

  const getOppositePosition = (args) => {
    const [placement] = position.split("-");
    switch (placement) {
      case "left":
        return canPlaceOnRight(args) && "right";
      case "right":
        return canPlaceOnLeft(args) && "left";
      case "top":
        return canPlaceOnBottom(args) && "bottom";
      case "bottom":
        return canPlaceOnTop(args) && "top";
      default:
        return false;
    }
  };

  const getAdjacentSides = (args) => {
    const [placement] = position.split("-");
    if (placement === "left" || placement === "right") {
      return [canPlaceOnTop(args) && "top", canPlaceOnBottom(args) && "bottom"];
    }
    if (placement === "top" || placement === "bottom") {
      return [canPlaceOnLeft(args) && "left", canPlaceOnRight(args) && "right"];
    }
  };

  const autoPlacement = (args) => {
    const posiblePositions = [
      getPosition(args),
      getOppositePosition(args),
      ...getAdjacentSides(args),
    ].filter(Boolean);

    if (posiblePositions.length !== 0) {
      let placement = `${posiblePositions[0]}-center`;
      const popperRect = popperPositions[placement]?.(args);
      setPopperPosition({ ...popperRect, placement });
    } else {
      popperPositions["bottom-start"]({ ...args, isDefault: true });
    }
  };

  const setPopperPosition = ({
    popper: { x: X, y: Y } = {},
    arrow: { x, y } = {},
    placement,
  }) => {
    const { scrollX, scrollY } = window;
    setState({
      popper: {
        ...state.popper,
        transform: `translate(${X + scrollX}px,${Y + scrollY}px)`,
      },
      ...(arrow && {
        arrow: {
          ...state.arrow,
          left: `${x + scrollX}px`,
          top: `${y + scrollY}px`,
        },
      }),
      position: placement ?? position,
    });
  };

  return render({ ...state, ref });
};

Popper.propTypes = {
  render: PropTypes.func.isRequired,
  referenceElement: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  position: PropTypes.oneOf(PopperPlacements),
  offset: PropTypes.number,
  arrow: PropTypes.bool,
  arrowRect: PropTypes.number,
};

Popper.defaultProps = {
  offset: 5,
  arrow: false,
  arrowRect: 16,
};
