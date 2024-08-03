"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ForexController_1 = require("../controller/ForexController");
const forexRouter = express_1.default.Router();
forexRouter.post("/registerforex", ForexController_1.registerForex);
forexRouter.get("/getforex", ForexController_1.getAllForex);
exports.default = forexRouter;
