"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function distance(x, y) {
    x = 250000 - x;
    y = 250000 - y;
    return Math.sqrt(x * x + y * y);
}
exports.default = distance;
