"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.decremented = exports.incremented = exports.store = exports.counterSlice = void 0;
const utils_1 = __importDefault(require("../utils"));
const toolkit_1 = require("@reduxjs/toolkit");
exports.counterSlice = (0, toolkit_1.createSlice)({
    name: 'counter',
    initialState: {},
    reducers: {
        incremented: (state, action) => {
            action.payload.forEach((e) => {
                if (e.serialNumber in state) {
                    state[e.serialNumber] = {
                        // square_dist:(temp_dis>droneReport[e.serialNumber].square_dist?droneReport[e.serialNumber].square_dist:temp_dis),
                        squareDist: (0, utils_1.default)(e.posX, e.posY),
                        timestamp: Date.now(),
                        posX: e.posX,
                        posY: e.posY
                    };
                }
                else {
                    state[e.serialNumber] = {
                        squareDist: (0, utils_1.default)(e.posX, e.posY),
                        timestamp: Date.now(),
                        posX: e.posX,
                        posY: e.posY
                    };
                }
            });
        },
        decremented: (state) => {
            const key = [];
            Object.keys(state).forEach(k => {
                const date = state[k].timestamp;
                const curDate = Date.now();
                console.log("I ran");
                const diff = curDate - date;
                const min = Math.round(((diff % 86400000) % 3600000) / 60000);
                if (min >= 10) {
                    delete state[k];
                }
            });
        }
    }
});
exports.store = (0, toolkit_1.configureStore)({
    reducer: exports.counterSlice.reducer
});
_a = exports.counterSlice.actions, exports.incremented = _a.incremented, exports.decremented = _a.decremented;
