"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unizikModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const unizikSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: [true, "please, enter your full name"]
    },
    email: {
        type: String,
        required: [true, "please, enter your email"]
    },
    phoneNumber: {
        type: String,
        required: [true, "please, enter your phone number"]
    }
});
exports.unizikModel = mongoose_1.default.model("allUnizik", unizikSchema);
