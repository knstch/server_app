"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config"); // Import settings for server & DB
// Import dev stack
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const app = (0, express_1.default)();
(0, mongoose_1.connect)(config_1.MONGO, (err) => {
    if (err)
        throw err;
    console.log("DB is connected");
});
app.use(express_1.default.urlencoded({ extended: false })); // Setting a middleware to work with forms on the website
//Setting a main page
app.get('/', (req, res) => {
    res.send("Server is running");
});
//Run server
app.listen(config_1.PORT, () => console.log("Server is running"));
