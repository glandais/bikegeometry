import { roundHuman, toDegreesHuman } from "./math.js";
import BikeGeometryState from "./state.js";
import BikeGeometryInteractive from "./interactive.js";

class BikeGeometryDrawer {
  /**
   * @param {HTMLCanvasElement} ctx
   * @param {CanvasRenderingContext2D} ctx
   * @param {BikeGeometryState} state
   * @param {BikeGeometryInteractive} interactive
   */
  constructor(canvas, ctx, state, interactive) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.state = state;
    this.interactive = interactive;
  }

  /**
   * @param {Number} x
   * @param {Number} y
   * @param {Number} r
   * @param {boolean} fill
   */
  drawCircle(x, y, r, fill = false) {
    let ctx = this.ctx;
    let debug = this.state.debug;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    if (fill && !debug) {
      ctx.fill();
    }
    ctx.stroke();
    ctx.closePath();
  }

  printStateValues(values) {
    let ctx = this.ctx;

    ctx.save();
    ctx.font = "16px serif";
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    let maxWidth = 0;
    for (let i = 0; i < values.length; i++) {
      maxWidth = Math.max(maxWidth, ctx.measureText(values[i]).width);
    }
    let x = this.canvas.width - maxWidth - 10;
    ctx.fillRect(x, 4, maxWidth, 17 * values.length);
    ctx.fillStyle = "#000";
    for (let i = 0; i < values.length; i++) {
      ctx.fillText(values[i], x, 20 + 17 * i);
    }
    ctx.restore();
  }

  getCommonValues() {
    let state = this.state;
    return [
      "state"
    ];
  }

  getDebugValues() {
    let values = this.getCommonValues();
    let state = this.state;
    let debugValues = [
      "Last draw: " + roundHuman(state.drawDuration, 2) + "ms",
      "cameraOffset.x: " + roundHuman(this.interactive.cameraOffset.x, 2),
      "cameraOffset.y: " + roundHuman(this.interactive.cameraOffset.y, 2),
      "cameraZoom: " + roundHuman(this.interactive.cameraZoom, 2),
      "worldWidth: " + roundHuman(this.interactive.worldWidth, 2),
    ];
    values.push(...debugValues);
    return values;
  }

  draw() {
    let ctx = this.ctx;
    let state = this.state;
    let debug = this.state.debug;

    let start = performance.now();
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "rgba(255,255,255,1.0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    ctx.save();
    ctx.font = "5px serif";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    ctx.lineWidth = 0.3;

    ctx.translate(
      this.interactive.cameraOffset.x,
      this.interactive.cameraOffset.y,
    );
    ctx.scale(this.interactive.cameraZoom, this.interactive.cameraZoom);

    ctx.save();

    ctx.fillStyle = "#055";
    ctx.strokeStyle = "#055";
    ctx.lineWidth = 1;

    let fd = state.frameDesign;
    this.drawSegment(fd.r, fd.bb);
    this.drawSegment(fd.r, fd.j);
    this.drawSegment(fd.j, fd.bb);
    this.drawSegment(fd.j, fd.s);
    this.drawSegment(fd.bb, fd.c);
    this.drawSegment(fd.s, fd.c);
    this.drawSegment(fd.f, fd.c);
    this.drawCircle(fd.r.x, fd.r.y, 336, false);
    this.drawCircle(fd.f.x, fd.f.y, 336, false);

    ctx.restore();

    //    this.cogsDrawer.drawCogs(state);
    //    this.rivetsDrawer.drawLinks(rivets);

    ctx.restore();

    if (debug) {
      this.printStateValues(this.getDebugValues(state));
    } else {
      this.printStateValues(this.getCommonValues(state));
    }
    state.drawDuration = performance.now() - start;
  }

  drawSegment(p1, p2) {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(p1.x, -p1.y);
    ctx.lineTo(p2.x, -p2.y);
    ctx.stroke();
  }
}

export default BikeGeometryDrawer;
