"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.task2 = exports.task1 = void 0;
const toad_scheduler_1 = require("toad-scheduler");
const axios_1 = __importDefault(require("axios"));
const store_1 = require("../../store");
const utils_1 = require("../../utils");
const parse = require("xml2js-parser").parseString;
const droneDataurl = 'https://assignments.reaktor.com/birdnest/drones';
// check for drones in prohibited zone
exports.task1 = new toad_scheduler_1.AsyncTask("lookForDrone", () => {
    return axios_1.default
        .get(droneDataurl, {
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
                return {
                    squareDist: (0, utils_1.distance)(e.positionX[0], e.positionY[0]),
                    serialNumber: e.serialNumber[0],
                    posX: e.positionX[0],
                    posY: e.positionY[0],
                    timestamp: Date.now(),
                };
            });
            if (drone.length >= 1) {
                // store.dispatch(incremented(drone));
                const reqArr = drone.map(e => {
                    return e.serialNumber;
                }).map(e => {
                    return "https://assignments.reaktor.com/birdnest/pilots/" + e;
                }).map(e => {
                    return axios_1.default.get(e);
                });
                axios_1.default.all(reqArr).then(e => {
                    e.forEach(e => {
                        console.log(e.data);
                    });
                }).catch(e => {
                    console.log(e);
                });
            }
        });
    })
        .catch((e) => {
        console.log(e);
    });
});
//cleanes the unwanted drone data
exports.task2 = new toad_scheduler_1.Task("cleanup", () => {
    store_1.store.dispatch((0, store_1.decremented)());
});
