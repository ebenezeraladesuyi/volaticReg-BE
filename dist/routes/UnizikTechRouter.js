"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UnizikTechController_1 = require("../controller/UnizikTechController");
const unizikRouter = express_1.default.Router();
unizikRouter.post("/registerunizik", UnizikTechController_1.registerUnizik);
unizikRouter.get("/getallunizik", UnizikTechController_1.getAllUnizik);
exports.default = unizikRouter;
