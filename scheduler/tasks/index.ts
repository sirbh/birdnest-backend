import { AsyncTask, Task } from "toad-scheduler";
import axios from "axios";

import { IDroneResponse, IDronePayload } from "../../models/drone";
import { incremented, decremented, store } from "../../store";
import {distance} from "../../utils";

const parse = require("xml2js-parser").parseString;
const droneDataurl = 'https://assignments.reaktor.com/birdnest/drones';


// check for drones in prohibited zone
export const task1 = new AsyncTask("lookForDrone", () => {
  return axios
    .get(droneDataurl, {
      headers: {
        "Content-Type": "text/xml",
      },
    })
    .then((e) => {
      parse(e.data, function (err: any, result: any) {
        const droneData: IDroneResponse[] = result.report.capture[0].drone;
        const drone: IDronePayload[] = droneData
          .filter((e) => {
            const x = 250000 - e.positionX[0];
            const y = 250000 - e.positionY[0];
            const sqr_dist = x * x + y * y;

            if (sqr_dist <= 100000 * 100000) return true;
          })
          .map((e) => {
            return {
              squareDist: distance(e.positionX[0], e.positionY[0]),
              serialNumber: e.serialNumber[0],
              posX: e.positionX[0],
              posY: e.positionY[0],
              timestamp: Date.now(),
            };
          });
        if (drone.length >= 1) {
          store.dispatch(incremented(drone));
        }
      });
    })
    .catch((e) => {
      console.log(e);
    });
});


//cleanes the unwanted drone data
export const task2 = new Task("cleanup", () => {
  store.dispatch(decremented());
});
