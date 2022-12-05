"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distance = void 0;
function distance(x, y) {
    x = 250 - parseFloat((x / 1000).toFixed(2));
    y = 250 - parseFloat((y / 1000).toFixed(2));
    return ((Math.sqrt(x * x + y * y)));
}
exports.distance = distance;
