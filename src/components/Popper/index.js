export class Popper {
  constructor({ reference, popper, placement, onUpdate }) {
    this.reference = reference;
    this.popper = popper;
    this.referenceRect = reference.getBoundingClientRect();
    this.popperRect = popper.getBoundingClientRect();
    this.placement = placement;
    this.innerWidth = undefined;
    this.innerHeight = undefined;
    this.onUpdate = onUpdate;
    this.popperStyle = { position: "absolute", inset: "0px auto auto 0px" };
    this.arrowStyle = { position: "absolute", inset: "0px auto auto 0px" };
    this.popperAttributes = { placement };
    this.popperPositions = {
      "left-center": this.placeOnLeftCenter.bind(this),
      "left-start": this.placeOnLeftStart.bind(this),
      "left-end": this.placeOnLeftEnd.bind(this),
      "right-start": this.placeOnRightStart.bind(this),
      "right-center": this.placeOnRightCenter.bind(this),
      "right-end": this.placeOnRightEnd.bind(this),
      "top-start": this.placeOnTopStart.bind(this),
      "top-center": this.placeOnTopCenter.bind(this),
      "top-end": this.placeOnTopEnd.bind(this),
      "bottom-start": this.placeOnBottomStart.bind(this),
      "bottom-center": this.placeOnBottomCenter.bind(this),
      "bottom-end": this.placeOnBottomEnd.bind(this),
    };
    this.parent = this.getScrollParent(this.reference);
    this.init();
  }

  init() {
    this.handlePopper();
    if (this.parent) {
      this.parent.addEventListener(
        "scroll",
        this.handlePopper.bind(this, true)
      );
    }
    window.addEventListener("resize", this.handlePopper.bind(this));
  }

  destroy() {
    if (this.parent) {
      this.parent.removeEventListener(
        "scroll",
        this.handlePopper.bind(this, true)
      );
    }
    window.removeEventListener("resize", this.handlePopper.bind(this));
  }

  canPlaceOnLeft() {
    return this.referenceRect.x > this.popperRect.width;
  }

  canPlaceOnRight() {
    return (
      this.innerWidth - (this.referenceRect.x + this.referenceRect.width) >
      this.popperRect.width
    );
  }

  canPlaceOnTop() {
    return this.referenceRect.y > this.popperRect.height;
  }

  canPlaceOnBottom() {
    let bottom =
      this.innerHeight - (this.referenceRect.y + this.referenceRect.height);
    return bottom > this.popperRect.height;
  }

  placeOnLeftStart() {
    if (!this.canPlaceOnLeft()) return false;
    const { scrollX, scrollY } = window;
    let left = this.referenceRect.x - this.popperRect.width;
    let top = this.referenceRect.y;
    return {
      popper: {
        left: left + scrollX,
        top: top + scrollY,
      },
    };
  }

  placeOnLeftCenter = () => {
    if (!this.canPlaceOnLeft()) return false;
    const { scrollX, scrollY } = window;
    let left = this.referenceRect.x - this.popperRect.width;
    let top =
      this.referenceRect.y -
      (this.popperRect.height / 2 - this.referenceRect.height / 2);
    return {
      popper: {
        left: left + scrollX,
        top: top + scrollY,
      },
    };
  };

  placeOnLeftEnd() {
    if (!this.canPlaceOnLeft()) return false;
    const { scrollX, scrollY } = window;
    let left = this.referenceRect.x - this.popperRect.width;
    let top =
      this.referenceRect.y -
      (this.popperRect.height - this.referenceRect.height);
    return {
      popper: {
        left: left + scrollX,
        top: top + scrollY,
      },
    };
  }

  placeOnRightStart() {
    if (!this.canPlaceOnRight()) return false;
    const { scrollX, scrollY } = window;
    let left = this.referenceRect.x + this.referenceRect.width;
    let top = this.referenceRect.y;
    return {
      popper: {
        left: left + scrollX,
        top: top + scrollY,
      },
    };
  }

  placeOnRightCenter = () => {
    if (!this.canPlaceOnRight()) return false;
    const { scrollX, scrollY } = window;
    let left = this.referenceRect.x + this.referenceRect.width;
    let top =
      this.referenceRect.y -
      (this.popperRect.height / 2 - this.referenceRect.height / 2);
    return {
      popper: {
        left: left + scrollX,
        top: top + scrollY,
      },
    };
  };

  placeOnRightEnd = () => {
    if (!this.canPlaceOnRight()) return false;
    const { scrollX, scrollY } = window;
    let left = this.referenceRect.x + this.referenceRect.width;
    let top =
      this.referenceRect.y -
      (this.popperRect.height - this.referenceRect.height);
    return {
      popper: {
        left: left + scrollX,
        top: top + scrollY,
      },
    };
  };

  placeOnTopStart = () => {
    if (!this.canPlaceOnTop()) return false;
    const { scrollX, scrollY } = window;
    let left = this.referenceRect.x;
    let top = this.referenceRect.y - this.popperRect.height;
    return {
      popper: {
        left: left + scrollX,
        top: top + scrollY,
      },
    };
  };

  placeOnTopCenter = () => {
    if (!this.canPlaceOnTop()) return false;
    const { scrollX, scrollY } = window;
    let left =
      this.referenceRect.x +
      (this.referenceRect.width / 2 - this.popperRect.width / 2);
    let top = this.referenceRect.y - this.popperRect.height;
    return {
      popper: {
        left: left + scrollX,
        top: top + scrollY,
      },
    };
  };

  placeOnTopEnd() {
    if (!this.canPlaceOnTop()) return false;
    const { scrollX, scrollY } = window;
    let left =
      this.referenceRect.x - (this.popperRect.width - this.referenceRect.width);
    let top = this.referenceRect.y - this.popperRect.height;
    return {
      popper: {
        left: left + scrollX,
        top: top + scrollY,
      },
    };
  }

  placeOnBottomStart(isDefault = false) {
    if (isDefault || !this.canPlaceOnBottom()) return false;
    const { scrollX, scrollY } = window;
    let left = this.referenceRect.x;
    let top = this.referenceRect.y + this.referenceRect.height;
    return {
      popper: {
        left: left + scrollX,
        top: top + scrollY,
      },
    };
  }

  placeOnBottomCenter() {
    if (!this.canPlaceOnBottom()) return false;
    const { scrollX, scrollY } = window;
    let left =
      this.referenceRect.x +
      (this.referenceRect.width / 2 - this.popperRect.width / 2);
    let top = this.referenceRect.y + this.referenceRect.height;
    return {
      popper: {
        left: left + scrollX,
        top: top + scrollY,
      },
    };
  }

  placeOnBottomEnd() {
    if (!this.canPlaceOnBottom()) return false;
    const { scrollX, scrollY } = window;
    let left =
      this.referenceRect.x - (this.popperRect.width - this.referenceRect.width);
    let top = this.referenceRect.y + this.referenceRect.height;
    return {
      popper: {
        left: left + scrollX,
        top: top + scrollY,
      },
    };
  }

  getPosition = () => {
    const [position] = this.placement.split("-");
    switch (position) {
      case "left":
        return this.canPlaceOnLeft() && "left-center";
      case "right":
        return this.canPlaceOnRight() && "right";
      case "top":
        return this.canPlaceOnTop() && "top";
      case "bottom":
        return this.canPlaceOnBottom() && "bottom";
      default:
        return false;
    }
  };

  getOppositePosition = () => {
    const [position] = this.placement.split("-");
    switch (position) {
      case "left":
        return this.canPlaceOnRight() && "right";
      case "right":
        return this.canPlaceOnLeft() && "left";
      case "top":
        return this.canPlaceOnBottom() && "bottom";
      case "bottom":
        return this.canPlaceOnTop() && "top";
      default:
        return false;
    }
  };

  getAdjacentSides = () => {
    const [position] = this.placement.split("-");
    if (position === "left" || position === "right") {
      return [
        this.canPlaceOnTop() && "top",
        this.canPlaceOnBottom() && "bottom",
      ];
    }
    if (position === "top" || position === "bottom") {
      return [
        this.canPlaceOnLeft() && "left",
        this.canPlaceOnRight() && "right",
      ];
    }
  };

  autoPlacement = () => {
    const posiblePositions = [
      this.getPosition(),
      this.getOppositePosition(),
      ...this.getAdjacentSides(),
    ].filter(Boolean);

    if (posiblePositions.length !== 0) {
      let placement = `${posiblePositions[0]}-center`;
      let rect = this.popperPositions[placement]?.();
      this.onUpdate({ popper: rect.popper, placement });
    } else {
      let rect = this.popperPositions["bottom-start"](true);
      this.onUpdate({ popper: rect.popper, placaement: "bottom-start" });
    }
  };

  handlePopper(isScroll = false) {
    const { innerWidth, innerHeight } = window;

    this.innerHeight = innerHeight;
    this.innerWidth = innerWidth;

    if (isScroll) {
      this.referenceRect = this.reference.getBoundingClientRect();
    }

    const rect = this.popperPositions[this.placement]?.();
    if (rect) {
      this.onUpdate({ popper: rect.popper, placement: this.placement });
    } else {
      this.autoPlacement(isScroll);
    }
  }

  getScrollParent(element) {
    if (!element) return null;

    let { position, overflow, overflowY, overflowX } =
      window.getComputedStyle(element);

    if (position === "fixed") return null;

    let overflowRegex = /(auto|scroll)/;

    if (overflowRegex.test(overflow + overflowX + overflowY)) return element;

    return this.getScrollParent(element.parentElement);
  }
}
