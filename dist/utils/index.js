"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distance = void 0;
function distance(x, y) {
    x = 250000 - x;
    y = 250000 - y;
    return ((Math.sqrt(x * x + y * y)) / 1000);
}
exports.distance = distance;
