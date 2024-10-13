
import { point, circle, arc, ray, vector } from "./lib/flatten.js";
import { deg2rad } from "./math.js"

class ForkData {
    constructor() {
        this.forkLength = 395;
        this.forkOffset = 52;
    }
}


class FrameDesignData {
    /**
     * 
     * @param {ForkData} forkData 
     */
    constructor(forkData) {
        this.chainStay = 430;
        this.bbDrop = 72;
        this.stack = 575;
        this.reach = 389;
        this.seattubeCC = 530;
        this.seattubeAngle = 73.5;
        this.headtubeAngle = 72;
        this.forkData = forkData;
    }
}

class FrameDesign {
    /**
     * 
     * @param {FrameDesignData} frameDesignData 
     */
    constructor(frameDesignData, state) {
        this.frameDesignData = frameDesignData;
        this.state = state;
    }

    logCompute(s) {
        if (this.state.debugCompute) {
            console.log(s);
        }
    }

    compute() {
        let fdd = this.frameDesignData;

        this.r = point(0, 0);
        let rMinusBB = this.r.translate(0, -fdd.bbDrop);
        let bbRay = ray(rMinusBB, vector(0, 1));
        let csCircle = circle(this.r, fdd.chainStay);
        let bbCandidates = bbRay.intersect(csCircle);
        this.bb = bbCandidates[0];
        this.s = this.bb.translate(fdd.reach, fdd.stack);

        let stVector = vector(-fdd.seattubeCC, 0);
        stVector = stVector.rotate(-deg2rad(fdd.seattubeAngle));
        this.j = this.bb.translate(stVector);

        let htVector = vector(-1, 0);
        htVector = htVector.rotate(-deg2rad(180 + fdd.headtubeAngle));
        let htVectorPerp = htVector.rotate(deg2rad(90));

        let axleRay = ray(this.r, vector(0, 1));
        let s2 = this.s.translate(htVectorPerp.scale(fdd.forkData.forkOffset, fdd.forkData.forkOffset));
        let s2Ray = ray(s2, htVectorPerp);
        let fCandidates = axleRay.intersect(s2Ray);
        this.f = fCandidates[0];

        let sRay = ray(this.s, htVectorPerp);
        let fForkArc = arc(this.f, fdd.forkData.forkLength, Math.PI / 2, Math.PI);
        let cCandidates = sRay.intersect(fForkArc);
        this.c = cCandidates[0];

        this.logCompute("R BB " + this.r.distanceTo(this.bb)[0]);
        this.logCompute("R J " + this.r.distanceTo(this.j)[0]);
        this.logCompute("R F " + this.r.distanceTo(this.f)[0]);

        this.logCompute("BB C " + this.bb.distanceTo(this.c)[0]);
        this.logCompute("BB J " + this.bb.distanceTo(this.j)[0]);
        this.logCompute("BB F " + this.bb.distanceTo(this.f)[0]);

        this.logCompute("J S " + this.j.distanceTo(this.s)[0]);

        this.logCompute("S C " + this.s.distanceTo(this.c)[0]);

        this.logCompute("C F " + this.c.distanceTo(this.f)[0]);

    }
}

export {
    ForkData,
    FrameDesignData,
    FrameDesign
};
