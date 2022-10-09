export class Popper {
  constructor({ reference, popper, placement, onUpdate }) {
    this._reference = reference;
    this._popper = popper;
    this._referenceRect = reference.getBoundingClientRect();
    this._popperRect = popper.getBoundingClientRect();
    this._placement = placement;
    this._innerWidth = window.innerWidth;
    this._innerHeight = window.innerHeight;
    this._popperStyle = { position: "absolute", inset: "0px auto auto 0px" };
    this._arrowStyle = { position: "absolute", inset: "0px auto auto 0px" };
    this._popperAttributes = { placement };
    this._popperPositions = {
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
    this._parent = this.getScrollParent(this._reference);
    this.onUpdate = onUpdate;
    this.init();
    console.log(this);
  }

  init() {
    this.handlePopper();
    if (this._parent) {
      this._parent.addEventListener(
        "scroll",
        this.handlePopper.bind(this, true)
      );
    }
    window.addEventListener("resize", this.handlePopper.bind(this));
  }

  destroy() {
    if (this._parent) {
      this._parent.removeEventListener(
        "scroll",
        this.handlePopper.bind(this, true)
      );
    }
    window.removeEventListener("resize", this.handlePopper.bind(this));
  }

  canPlaceOnLeft() {
    return this._referenceRect.x > this._popperRect.width;
  }

  canPlaceOnRight() {
    return (
      this._innerWidth - (this._referenceRect.x + this._referenceRect.width) >
      this._popperRect.width
    );
  }

  canPlaceOnTop() {
    return this._referenceRect.y > this._popperRect.height;
  }

  canPlaceOnBottom() {
    let bottom =
      this._innerHeight - (this._referenceRect.y + this._referenceRect.height);
    return bottom > this._popperRect.height;
  }

  placeOnLeftStart() {
    if (!this.canPlaceOnLeft()) return false;
    const { scrollX, scrollY } = window;
    let left = this._referenceRect.x - this._popperRect.width;
    let top = this._referenceRect.y;
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
    let left = this._referenceRect.x - this._popperRect.width;
    let top =
      this._referenceRect.y -
      (this._popperRect.height / 2 - this._referenceRect.height / 2);
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
    let left = this._referenceRect.x - this._popperRect.width;
    let top =
      this._referenceRect.y -
      (this._popperRect.height - this._referenceRect.height);
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
    let left = this._referenceRect.x + this._referenceRect.width;
    let top = this._referenceRect.y;
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
    let left = this._referenceRect.x + this._referenceRect.width;
    let top =
      this._referenceRect.y -
      (this._popperRect.height / 2 - this._referenceRect.height / 2);
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
    let left = this._referenceRect.x + this._referenceRect.width;
    let top =
      this._referenceRect.y -
      (this._popperRect.height - this._referenceRect.height);
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
    let left = this._referenceRect.x;
    let top = this._referenceRect.y - this._popperRect.height;
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
      this._referenceRect.x +
      (this._referenceRect.width / 2 - this._popperRect.width / 2);
    let top = this._referenceRect.y - this._popperRect.height;
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
      this._referenceRect.x -
      (this._popperRect.width - this._referenceRect.width);
    let top = this._referenceRect.y - this._popperRect.height;
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
    let left = this._referenceRect.x;
    let top = this._referenceRect.y + this._referenceRect.height;
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
      this._referenceRect.x +
      (this._referenceRect.width / 2 - this._popperRect.width / 2);
    let top = this._referenceRect.y + this._referenceRect.height;
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
      this._referenceRect.x -
      (this._popperRect.width - this._referenceRect.width);
    let top = this._referenceRect.y + this._referenceRect.height;
    return {
      popper: {
        left: left + scrollX,
        top: top + scrollY,
      },
    };
  }

  getPosition = () => {
    const [position] = this._placement.split("-");
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
    const [position] = this._placement.split("-");
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
    const [position] = this._placement.split("-");
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
      let rect = this._popperPositions[placement]?.();
      this.onUpdate({ popper: rect.popper, placement });
    } else {
      let rect = this._popperPositions["bottom-start"](true);
      this.onUpdate({ popper: rect.popper, placaement: "bottom-start" });
    }
  };

  handlePopper(isScroll = false) {
    const { innerWidth, innerHeight } = window;
    console.log(this);

    this._innerHeight = innerHeight;
    this._innerWidth = innerWidth;

    if (isScroll) {
      this._referenceRect = this._reference.getBoundingClientRect();
    }

    const rect = this._popperPositions[this._placement]?.();
    if (rect) {
      this.onUpdate({ popper: rect.popper, placement: this._placement });
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
