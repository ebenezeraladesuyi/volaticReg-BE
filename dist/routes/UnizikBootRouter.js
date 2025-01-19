"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UnizikBootController_1 = require("../controller/UnizikBootController");
const unizikBootRouter = express_1.default.Router();
unizikBootRouter.post("/registerproject200", UnizikBootController_1.registerBootUnizik);
unizikBootRouter.get("/getallproject200", UnizikBootController_1.getAllBootUnizik);
exports.default = unizikBootRouter;
