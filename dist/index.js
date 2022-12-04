"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const scheduler_1 = require("./scheduler");
const store_1 = require("./store");
const parse = require("xml2js-parser").parseString;
const { ToadScheduler, SimpleIntervalJob, AsyncTask, Task } = require("toad-scheduler");
const app = (0, express_1.default)();
const scheduler = new ToadScheduler();
// const droneReport:Report  = {};
// const counterSlice = createSlice({
//     name: 'counter',
//     initialState: {
//     },
//     reducers: {
//       incremented: (state:Report,action:PayloadAction<resp[]>) => {
//         action.payload.forEach((e:resp) => {
//             if (e.serialNumber in state) {
//               state[e.serialNumber] = {
//                 // square_dist:(temp_dis>droneReport[e.serialNumber].square_dist?droneReport[e.serialNumber].square_dist:temp_dis),
//                 square_dist:dis(e.posX,e.posY),
//                 timestamp: Date.now(),
//                 posX:e.posX,
//                 posY:e.posY
//               };
//             } else {
//               state[e.serialNumber] = {
//                 square_dist:dis(e.posX,e.posY),
//                 timestamp: Date.now(),
//                 posX:e.posX,
//                 posY:e.posY
//               };
//             }
//           })
//       },
//       decremented: (state:Report) => {
//         const key:string[]=[]
//         Object.keys(state).forEach(k=>{
//                   const date = state[k].timestamp
//                   const curDate = Date.now()
//                   console.log("I ran")
//                   const diff = curDate - date;
//                   const min = Math.round(((diff % 86400000) % 3600000) / 60000);
//                   if(min>=10){
//                      delete state[k]
//                   }
//                 })
//       }
//     }
//   })
//   export const { incremented, decremented } = counterSlice.actions
// const task2 = new Task('complex task',()=>{
//     store.dispatch(decremented())
// })
// const task = new AsyncTask("simple task", () => {
//   return axios
//     .get("https://assignments.reaktor.com/birdnest/drones", {
//       headers: {
//         "Content-Type": "text/xml",
//       },
//     })
//     .then((e) => {
//       parse(e.data, function (err: any, result: any) {
//         const droneData: droneDataType[] = result.report.capture[0].drone;
//         const timestamp: string = result.report.capture[0]["$"]["snapshotTimestamp"];
//         const drone: resp[] = droneData
//           .filter((e) => {
//             const x = 250000 - e.positionX[0];
//             const y = 250000 - e.positionY[0];
//             const sqr_dist = x * x + y * y
//             if (sqr_dist <= 100000 * 100000) return true;
//           })
//           .map((e) => {
//             const x = e.positionX[0];
//             const y = e.positionY[0];
//             const sqr_dist = x * x + y * y
//             return {
//               square_dist:dis(x,y),
//               serialNumber: e.serialNumber[0],
//               posX:e.positionX[0],
//               posY:e.positionY[0]
//             };
//           });
//         if (drone.length >= 1) {
// DroneModel.insertMany(drone).then(e=>{
//       console.log(e)
// }).catch(e=>{
//       console.log(e)
// })
//   drone.forEach((e) => {
//     if (e.serialNumber in droneReport) {
//       droneReport[e.serialNumber] = {
//         // square_dist:(temp_dis>droneReport[e.serialNumber].square_dist?droneReport[e.serialNumber].square_dist:temp_dis),
//         square_dist:dis(e.posX,e.posY),
//         timestamp: Date.now(),
//         posX:e.posX,
//         posY:e.posY
//       };
//     } else {
//       droneReport[e.serialNumber] = {
//         square_dist:dis(e.posX,e.posY),
//         timestamp: Date.now(),
//         posX:e.posX,
//         posY:e.posY
//       };
//     }
//   });
//   console.log(Object.keys(droneReport).length)
//   console.log(droneReport)
//         store.dispatch(incremented(drone))
//         }
//       });
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// });
// const job = new SimpleIntervalJob({ seconds: 5, runImmediately: true }, task, {
//   id: "id_1",
//   preventOverrun: true,
// });
// const job2 = new SimpleIntervalJob({ seconds: 300, runImmediately: true }, task2, {
//     id: "id_2",
//     preventOverrun: true,
//   });
app.get("/add", (req, res, next) => {
    console.log("hello");
    res.send("<h1>This is the heading</h1>");
});
app.get("/upd", (req, res, next) => {
    console.log("hello");
    res.send("<h1>This is the heading</h1>");
});
(0, mongoose_1.connect)("mongodb+srv://saurabh1202:saurabhm123@cluster0.6fs87uh.mongodb.net/Drones?retryWrites=true&w=majority").then(res => {
    app.listen(8080);
    scheduler.addSimpleIntervalJob(scheduler_1.job);
    scheduler.addSimpleIntervalJob(scheduler_1.job2);
    store_1.store.subscribe(() => console.log(Object.keys(store_1.store.getState()).length));
}).catch(e => {
    console.log(e);
});
