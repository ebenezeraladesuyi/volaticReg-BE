"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: [true, "please enter your firstname"],
    },
    surname: {
        type: String,
        required: [true, "please enter your surname"],
    },
    email: {
        type: String,
        required: [true, "please enter your email"],
    },
    phoneNumber: {
        type: String,
        required: [true, "please enter your phone number"],
    },
    educationalQualification: {
        type: String,
        required: [true, "please enter your educational qualification"],
    },
    computerExperience: {
        type: String,
        required: [true],
    },
    address: {
        type: String,
        required: [true, "please enter your address"],
    },
    emergencyContactName: {
        type: String,
        required: [true, "please enter your emergency contact name"],
    },
    emergencyContactRelationship: {
        type: String,
        required: [true, "please enter your emergency contact relationship"],
    },
    emergencyContactNumber: {
        type: String,
        required: [true, "please enter your emergency contact number"],
    },
});
const UserModel = mongoose_1.default.model("AllUsers", userSchema);
exports.default = UserModel;
