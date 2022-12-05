"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.job2 = exports.job1 = void 0;
const toad_scheduler_1 = require("toad-scheduler");
const tasks_1 = require("./tasks");
exports.job1 = new toad_scheduler_1.SimpleIntervalJob({ seconds: 5, runImmediately: true }, tasks_1.task1, {
    id: "id_1",
    preventOverrun: true,
});
exports.job2 = new toad_scheduler_1.SimpleIntervalJob({ seconds: 300, runImmediately: true }, tasks_1.task2, {
    id: "id_2",
    preventOverrun: true,
});
