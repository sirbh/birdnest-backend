import express from "express";
import { connect as dbConnect } from "mongoose";
import { ToadScheduler } from "toad-scheduler";
import { Server } from "socket.io";
import cors from "cors";

import { job1, job2 } from "./scheduler";
import { store } from "./store";

const app = express();

const scheduler = new ToadScheduler();

const port  = process.env.PORT||8080

const server = app.listen(port);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log("a user connected");
});
scheduler.addSimpleIntervalJob(job1);
// scheduler.addSimpleIntervalJob(job2)
// store.subscribe(() =>{
//     io.emit('droneData',store.getState())
//     console.log('sent')
// } )
