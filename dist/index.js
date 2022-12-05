"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const toad_scheduler_1 = require("toad-scheduler");
const socket_io_1 = require("socket.io");
const scheduler_1 = require("./scheduler");
const app = (0, express_1.default)();
const scheduler = new toad_scheduler_1.ToadScheduler();
(0, mongoose_1.connect)("mongodb+srv://saurabh1202:saurabhm123@cluster0.6fs87uh.mongodb.net/Drones?retryWrites=true&w=majority").then(res => {
    const server = app.listen(8080);
    const io = new socket_io_1.Server(server, { cors: {
            origin: "*"
        } });
    io.on('connection', (socket) => {
        console.log('a user connected');
    });
    scheduler.addSimpleIntervalJob(scheduler_1.job1);
    // scheduler.addSimpleIntervalJob(job2)
    // store.subscribe(() =>{
    //     io.emit('droneData',store.getState())
    //     console.log('sent')
    // } )
}).catch(e => {
    console.log(e);
});
