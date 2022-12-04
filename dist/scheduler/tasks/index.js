"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.task2 = exports.task1 = void 0;
const toad_scheduler_1 = require("toad-scheduler");
const axios_1 = __importDefault(require("axios"));
const store_1 = require("../../store");
const utils_1 = __importDefault(require("../../utils"));
const parse = require("xml2js-parser").parseString;
exports.task1 = new toad_scheduler_1.AsyncTask("lookForDrone", () => {
    return axios_1.default
        .get("https://assignments.reaktor.com/birdnest/drones", {
        headers: {
            "Content-Type": "text/xml",
        },
    })
        .then((e) => {
        parse(e.data, function (err, result) {
            const droneData = result.report.capture[0].drone;
            const drone = droneData
                .filter((e) => {
                const x = 250000 - e.positionX[0];
                const y = 250000 - e.positionY[0];
                const sqr_dist = x * x + y * y;
                if (sqr_dist <= 100000 * 100000)
                    return true;
            })
                .map((e) => {
                const x = e.positionX[0];
                const y = e.positionY[0];
                const sqr_dist = x * x + y * y;
                return {
                    squareDist: (0, utils_1.default)(x, y),
                    serialNumber: e.serialNumber[0],
                    posX: e.positionX[0],
                    posY: e.positionY[0],
                    timestamp: Date.now(),
                };
            });
            if (drone.length >= 1) {
                store_1.store.dispatch((0, store_1.incremented)(drone));
            }
        });
    })
        .catch((e) => {
        console.log(e);
    });
});
exports.task2 = new toad_scheduler_1.Task('complex task', () => {
    store_1.store.dispatch((0, store_1.decremented)());
});