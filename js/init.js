import BikeGeometryState from "./state.js";
import BikeGeometryMain from "./main.js";
import BikeGeometryUi from "./ui.js";

function initBikeGeometry() {
  
  let state = new BikeGeometryState();
  /** @type {BikeGeometryUi} */
  let ui = null;
  let main = new BikeGeometryMain(state, "canvas", () => ui.update());
  ui = new BikeGeometryUi(state, main, main.interactive);
  main.start();
  ui.init();
}

window.initBikeGeometry = initBikeGeometry;
