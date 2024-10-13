import BikeGeometryInteractive from "./interactive.js";
import BikeGeometryDrawer from "./drawer.js";
import BikeGeometryState from "./state.js";

class BikeGeometryMain {
  /**
   * @param {BikeGeometryState} state
   * @param {string} canvasId
   * @param {Function} onReset
   */
  constructor(state, canvasId, onReset) {
    /** @type {HTMLCanvasElement} */
    this.canvas = document.getElementById(canvasId);
    /** @type {CanvasRenderingContext2D} */
    let ctx = this.canvas.getContext("2d");

    this.interactive = new BikeGeometryInteractive(this.canvas, this);
    this.interactive.initInteractive();

    this.state = state;

    this.drawer = new BikeGeometryDrawer(
      this.canvas,
      ctx,
      this.state,
      this.interactive,
    );

    /** @type {Function} */
    this.onReset = onReset;
  }

  start() {
    this.resetState();
    this.drawer.draw();
  }

  resetState() {
    this.state.reset();
    this.onReset();
    this.interactive.reset();
    this.compute();
  }

  draw() {
    this.drawer.draw();
  }

  compute() {
    this.state.compute();
    this.drawer.draw();
  }
}

export default BikeGeometryMain;
