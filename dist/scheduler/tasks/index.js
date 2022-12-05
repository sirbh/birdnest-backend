"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const droneDataurl = "https://assignments.reaktor.com/birdnest/drones";
// check for drones in prohibited zone
exports.task1 = new toad_scheduler_1.AsyncTask("lookForDrone", () => __awaiter(void 0, void 0, void 0, function* () {
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
                // const x = 250000 - e.positionX[0];
                // const y = 250000 - e.positionY[0];
                // const sqr_dist = x * x + y * y;
                // if (sqr_dist <= 100000 * 100000) return true;
                console.log(e);
                if ((0, utils_1.distance)(e.positionX[0], e.positionY[0]) < 100)
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
                console.log(drone);
                // store.dispatch(incremented(drone));
                Promise.all(drone.map((e) => __awaiter(this, void 0, void 0, function* () {
                    let pilotDetails;
                    try {
                        const res = yield axios_1.default.get(`https://assignments.reaktor.com/birdnest/pilots/` +
                            e.serialNumber);
                        pilotDetails = {
                            distance: e.squareDist,
                            email: res.data.email,
                            name: res.data.firstName + " " + res.data.lastName,
                            phone: res.data.phoneNumber,
                            serialNumber: e.serialNumber,
                        };
                    }
                    catch (error) {
                        pilotDetails = {
                            distance: e.squareDist,
                            email: "",
                            name: "",
                            phone: "",
                            serialNumber: e.serialNumber,
                        };
                    }
                    return pilotDetails;
                }))).then((data) => {
                    store_1.store.dispatch((0, store_1.incremented)(data));
                });
            }
        });
    })
        .catch((e) => {
        console.log(e);
    });
}));
//cleanes the unwanted drone data
exports.task2 = new toad_scheduler_1.Task("cleanup", () => {
    store_1.store.dispatch((0, store_1.decremented)());
});
