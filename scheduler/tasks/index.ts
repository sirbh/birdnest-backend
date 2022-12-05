import { AsyncTask, Task } from "toad-scheduler";
import axios from "axios";

import { IDroneResponse, IDronePayload } from "../../models/drone";
import { IPilotContactDetails, IPilotDroneDetails } from "../../models/pilot";
import { saveDroneDetails, cleanDroneDetails, store } from "../../store";
import { distance } from "../../utils";

const parse = require("xml2js-parser").parseString;
const droneDataurl = "https://assignments.reaktor.com/birdnest/drones";

// check for drones in prohibited zone
export const task1 = new AsyncTask("lookForDrone", async () => {
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
            if (distance(e.positionX[0], e.positionY[0]) < 100) return true;
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
          // store.dispatch(incremented(drone));
          Promise.all(
            drone.map(async (e) => {
              let pilotDetails: IPilotDroneDetails;
              try {
                const res = await axios.get<IPilotContactDetails>(
                  `https://assignments.reaktor.com/birdnest/pilots/` +
                    e.serialNumber
                );
                pilotDetails = {
                  distance: e.squareDist,
                  email: res.data.email,
                  name: res.data.firstName + " " + res.data.lastName,
                  phone: res.data.phoneNumber,
                  serialNumber: e.serialNumber,
                };
              } catch (error) {
                pilotDetails = {
                  distance: e.squareDist,
                  email: "",
                  name: "",
                  phone: "",
                  serialNumber: e.serialNumber,
                };
              }

              return pilotDetails;
            })
          ).then((data) => {
            store.dispatch(saveDroneDetails(data));
          });
        }
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

//cleanes the unwanted drone data
export const task2 = new Task("cleanup", () => {
  store.dispatch(cleanDroneDetails());
});
