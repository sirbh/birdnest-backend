"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const toad_scheduler_1 = require("toad-scheduler");
const socket_io_1 = require("socket.io");
const scheduler_1 = require("./scheduler");
const store_1 = require("./store");
const app = (0, express_1.default)();
const scheduler = new toad_scheduler_1.ToadScheduler();
const port = process.env.PORT || 8080;
const server = app.listen(port);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
io.on("connection", (socket) => {
    console.log("a user connected");
});
scheduler.addSimpleIntervalJob(scheduler_1.job1);
scheduler.addSimpleIntervalJob(scheduler_1.job2);
store_1.store.subscribe(() => {
    io.emit('droneData', store_1.store.getState());
    console.log('sent');
});
