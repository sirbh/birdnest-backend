"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.decremented = exports.incremented = exports.store = exports.counterSlice = void 0;
const utils_1 = require("../utils");
const toolkit_1 = require("@reduxjs/toolkit");
exports.counterSlice = (0, toolkit_1.createSlice)({
    name: "counter",
    initialState: {},
    reducers: {
        incremented: (state, action) => {
            action.payload.forEach((e) => {
                if (e.serialNumber in state) {
                    state[e.serialNumber] = {
                        //checking if old distance is smaller than new one
                        squareDist: state[e.serialNumber].squareDist > (0, utils_1.distance)(e.posX, e.posY)
                            ? (0, utils_1.distance)(e.posX, e.posY)
                            : state[e.serialNumber].squareDist,
                        timestamp: Date.now(),
                        posX: e.posX,
                        posY: e.posY,
                    };
                }
                else {
                    state[e.serialNumber] = {
                        squareDist: (0, utils_1.distance)(e.posX, e.posY),
                        timestamp: Date.now(),
                        posX: e.posX,
                        posY: e.posY,
                    };
                }
            });
        },
        decremented: (state) => {
            const key = [];
            Object.keys(state).forEach((k) => {
                const date = state[k].timestamp;
                const curDate = Date.now();
                console.log("I ran");
                const diff = curDate - date;
                const min = Math.round(((diff % 86400000) % 3600000) / 60000);
                if (min >= 10) {
                    delete state[k];
                }
            });
        },
    },
});
exports.store = (0, toolkit_1.configureStore)({
    reducer: exports.counterSlice.reducer,
});
_a = exports.counterSlice.actions, exports.incremented = _a.incremented, exports.decremented = _a.decremented;
