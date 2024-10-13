
function deg2rad(d) {
    return Math.PI * d / 180.0;
}

/**
 * @param {Number} v value
 * @param {Number} d decimals count
 */
function roundHuman(v, d) {
    return Math.round(v * Math.pow(10, d)) / Math.pow(10, d);
}

/**
 * @param {Number} a angle (rad)
 */
function toDegreesHuman(a) {
    return roundHuman((180.0 * a) / Math.PI, 1);
}

export {
    roundHuman,
    toDegreesHuman,
    deg2rad,
};
