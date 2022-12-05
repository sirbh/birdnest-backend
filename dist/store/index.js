"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanDroneDetails = exports.saveDroneDetails = exports.store = exports.droneSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.droneSlice = (0, toolkit_1.createSlice)({
    name: "counter",
    initialState: {},
    reducers: {
        saveDroneDetails: (state, action) => {
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
        cleanDroneDetails: (state) => {
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
    reducer: exports.droneSlice.reducer,
});
_a = exports.droneSlice.actions, exports.saveDroneDetails = _a.saveDroneDetails, exports.cleanDroneDetails = _a.cleanDroneDetails;
