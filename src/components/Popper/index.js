import { useEffect, useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { PopperPlacements } from "utils/constants";

export const Popper = ({
  render,
  referenceRef,
  placement,
  offset,
  arrow,
  strategy,
}) => {
  const popperRef = useRef();

  const [state, setState] = useState({
    popper: {
      position: strategy,
      inset: "0px auto auto 0px",
    },
    arrow: {
      position: "absolute",
    },
    placement,
  });

  const gap = 5;

  useLayoutEffect(() => {
    handlePopper();
  }, [referenceRef.current]);

  useEffect(() => {
    window.addEventListener("resize", handlePopper);
    return () => window.removeEventListener("resize", handlePopper);
  }, []);

  const ref = (element) => {
    popperRef.current = element;
  };

  const handlePopper = () => {
    const reference = referenceRef.current?.getBoundingClientRect();

    const popper = popperRef.current?.getBoundingClientRect();

    const { innerWidth, innerHeight } = window;

    const args = {
      reference,
      popper,
      innerWidth,
      innerHeight,
    };

    const popperRect = popperPositions[placement]?.(args);

    popperRect ? setPopperPosition(popperRect) : autoPlacement(args);
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
      placement: "left-start",
      ...(arrow && {
        arrow: {
          x: 0,
          y: 0,
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
      placement: "left-center",
      ...(arrow && {
        arrow: {
          x: 0,
          y: 0,
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
      placement: "left-end",
      ...(arrow && {
        arrow: {
          x: 0,
          y: 0,
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
      placement: "right-start",
      ...(arrow && {
        arrow: {
          x: 0,
          y: 0,
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
      placement: "right-center",
      ...(arrow && {
        arrow: {
          x: 0,
          y: 0,
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
      placement: "right-end",
      ...(arrow && {
        arrow: {
          x: 0,
          y: 0,
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
      placement: "top-start",
      ...(arrow && {
        arrow: {
          x: 0,
          y: 0,
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
      placement: "top-center",
      ...(arrow && {
        arrow: {
          x: 0,
          y: 0,
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
      placement: "top-end",
      ...(arrow && {
        arrow: {
          x: 0,
          y: 0,
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
      placement: "bottom-start",
      ...(arrow && {
        arrow: { x: 0, y: 0 },
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
      placement: "bottom-center",
      ...(arrow && {
        arrow: {
          x: 0,
          y: 0,
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
      placement: "bottom-end",
      ...(arrow && {
        arrow: {
          x: 0,
          y: 0,
        },
      }),
    };
  };

  const getPosition = (args) => {
    const [position] = placement.split("-");
    switch (position) {
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
    const [position] = placement.split("-");
    switch (position) {
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
    const [position] = placement.split("-");
    if (position === "left" || position === "right") {
      return [canPlaceOnTop(args) && "top", canPlaceOnBottom(args) && "bottom"];
    }
    if (position === "top" || position === "bottom") {
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
    let left = strategy === "absolute" ? X + scrollX : X;
    let top = strategy === "absolute" ? Y + scrollY : Y;
    setState({
      popper: {
        ...state.popper,
        transform: `translate(${left}px,${top}px)`,
      },
      ...(arrow && {
        arrow: {
          ...state.arrow,
          left: `${x + scrollX}px`,
          top: `${y + scrollY}px`,
        },
      }),
      placement: placement,
    });
  };

  return render({ ...state, ref });
};

Popper.propTypes = {
  render: PropTypes.func.isRequired,
  referenceRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  placement: PropTypes.string,
  offset: PropTypes.number,
  arrow: PropTypes.bool,
  strategy: PropTypes.string,
};
