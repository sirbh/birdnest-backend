import express from "express";
import axios from "axios";
import dis from './utilites'
const parse = require("xml2js-parser").parseString;
const {
  ToadScheduler,
  SimpleIntervalJob,
  AsyncTask,
  Task
} = require("toad-scheduler");

const app = express();

const scheduler = new ToadScheduler();

export type droneDataType = {
  positionX: number[];
  positionY: number[];
  serialNumber: string[];
};

type resp = {
  square_dist:number,
  serialNumber: string;
  posX:number,
  posY:number
};

const droneReport: {
  [k: string]: {
    square_dist:number,
    timestamp: number;
    posX:number,
    posY:number
  };
} = {};

const task2 = new Task('complex task',()=>{
   for(const k in droneReport){
      const date = droneReport[k].timestamp
      const curDate = Date.now()
      console.log("I ran")
      const diff = curDate - date;
      const min = Math.round(((diff % 86400000) % 3600000) / 60000);
      if(min>=1){
        console.log('removed')
        delete droneReport['k']
        console.log(k)
        console.log(droneReport)
      }
   }
})

const task = new AsyncTask("simple task", () => {
  return axios
    .get("https://assignments.reaktor.com/birdnest/drones", {
      headers: {
        "Content-Type": "text/xml",
      },
    })
    .then((e) => {
      parse(e.data, function (err: any, result: any) {
        const droneData: droneDataType[] = result.report.capture[0].drone;
        const timestamp: string =
          result.report.capture[0]["$"]["snapshotTimestamp"];
        const drone: resp[] = droneData
          .filter((e) => {
            const x = 250000 - e.positionX[0];
            const y = 250000 - e.positionY[0];
            const sqr_dist = x * x + y * y
            
            if (sqr_dist <= 100000 * 100000) return true;
          })
          .map((e) => {
            const x = 250000 - e.positionX[0];
            const y = 250000 - e.positionY[0];
            const sqr_dist = x * x + y * y
            return {
              square_dist:sqr_dist,
              serialNumber: e.serialNumber[0],
              posX:e.positionX[0],
              posY:e.positionY[0]
            };
          });
        if (drone.length >= 1) {
          drone.forEach((e) => {
            if (e.serialNumber in droneReport) {
              const temp_dis = e.square_dist
              droneReport[e.serialNumber] = {
                // square_dist:(temp_dis>droneReport[e.serialNumber].square_dist?droneReport[e.serialNumber].square_dist:temp_dis),
                square_dist:dis(e.posX,e.posY),
                timestamp: Date.now(),
                posX:e.posX,
                posY:e.posY
              };
            } else {
              droneReport[e.serialNumber] = {
                square_dist:dis(e.posX,e.posY),
                timestamp: Date.now(),
                posX:e.posX,
                posY:e.posY
              };
            }
          });
          console.log(Object.keys(droneReport).length)
        // console.log(droneReport)
        }
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

const job = new SimpleIntervalJob({ seconds: 5, runImmediately: true }, task, {
  id: "id_1",
  preventOverrun: true,
});

const job2 = new SimpleIntervalJob({ seconds: 60, runImmediately: true }, task2, {
    id: "id_2",
    preventOverrun: true,
  });

scheduler.addSimpleIntervalJob(job);
scheduler.addSimpleIntervalJob(job2);

app.use("/", (req, res, next) => {
  console.log("hello");
  next();
});

app.use("/add", (req, res, next) => {
  console.log("hello");
  res.send("<h1>This is the heading</h1>");
});

app.use((req, res, next) => {
  console.log("hello 2");
});

app.listen(8080);
