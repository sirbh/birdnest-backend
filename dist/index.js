"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use('/', (req, res, next) => {
    console.log("hello");
    next();
});
app.use('/add', (req, res, next) => {
    console.log("hello");
    res.send("<h1>This is the ing</h1>");
});
app.use((req, res, next) => {
    console.log("hello 2");
});
app.listen(8080);
