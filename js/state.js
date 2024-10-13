
import { ForkData, FrameDesignData, FrameDesign } from "./frame_design.js";

class BikeGeometryState {
    constructor() {
        this.reset();
    }
    reset() {
        this.debug = false;
        this.debugCompute = false;

        this.forkData = new ForkData();
        this.frameDesignData = new FrameDesignData(this.forkData);
        this.frameDesign = new FrameDesign(this.frameDesignData, this);
        this.compute();
    }
    compute() {
        this.frameDesign.compute();
    }
    get stack() {
        return this.frameDesignData.stack;
    }
    set stack(v) {
        this.frameDesignData.stack = v;
    }
    get reach() {
        return this.frameDesignData.reach;
    }
    set reach(v) {
        this.frameDesignData.reach = v;
    }
    get chainStay() {
        return this.frameDesignData.chainStay;
    }
    set chainStay(v) {
        this.frameDesignData.chainStay = v;
    }
    get bbDrop() {
        return this.frameDesignData.bbDrop;
    }
    set bbDrop(v) {
        this.frameDesignData.bbDrop = v;
    }
    get seattubeCC() {
        return this.frameDesignData.seattubeCC;
    }
    set seattubeCC(v) {
        this.frameDesignData.seattubeCC = v;
    }
    get seattubeAngle() {
        return this.frameDesignData.seattubeAngle;
    }
    set seattubeAngle(v) {
        this.frameDesignData.seattubeAngle = v;
    }
    get headtubeAngle() {
        return this.frameDesignData.headtubeAngle;
    }
    set headtubeAngle(v) {
        this.frameDesignData.headtubeAngle = v;
    }
    get forkLength() {
        return this.frameDesignData.forkData.forkLength;
    }
    set forkLength(v) {
        this.frameDesignData.forkData.forkLength = v;
    }
    get forkOffset() {
        return this.frameDesignData.forkData.forkOffset;
    }
    set forkOffset(v) {
        this.frameDesignData.forkData.forkOffset = v;
    }
}

export default BikeGeometryState;