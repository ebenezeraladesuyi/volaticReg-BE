"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const userRouter = express_1.default.Router();
userRouter.get("/registered", UserController_1.getAllUsers);
userRouter.get("/registered/:userId", UserController_1.getOneUser);
userRouter.post("/register", UserController_1.register);
exports.default = userRouter;
