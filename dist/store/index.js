"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.decremented = exports.incremented = exports.store = exports.counterSlice = void 0;
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
                        name: e.name,
                        email: e.phone,
                        phone: e.phone,
                        distance: state[e.serialNumber].distance > e.distance
                            ? e.distance
                            : state[e.serialNumber].distance,
                        timestamp: Date.now(),
                    };
                }
                else {
                    state[e.serialNumber] = {
                        name: e.name,
                        email: e.phone,
                        phone: e.phone,
                        distance: e.distance,
                        timestamp: Date.now(),
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
