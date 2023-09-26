"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.getOneUser = exports.getAllUsers = void 0;
const UserModel_1 = __importDefault(require("../model/UserModel"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserModel_1.default.find();
        return res.status(200).json({
            message: "gotten all users",
            data: users,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "failed to get all users",
            data: error,
        });
    }
});
exports.getAllUsers = getAllUsers;
//get one user
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserModel_1.default.findById(req.params.userId);
        return res.status(200).json({
            message: "gotten one user",
            data: users,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "failed to get all users",
            data: error,
        });
    }
});
exports.getOneUser = getOneUser;
//register a user
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, surname, email, phoneNumber, educationalQualification, computerExperience, emergencyContactName, emergencyContactRelationship, emergencyContactNumber, } = req.body;
        const checkExist = yield UserModel_1.default.findOne({ email });
        if (checkExist) {
            return res.status(500).json({
                message: "This email has been used",
            });
        }
        else {
            const users = yield UserModel_1.default.create({
                firstName,
                surname,
                email,
                phoneNumber,
                educationalQualification,
                computerExperience,
                emergencyContactName,
                emergencyContactRelationship,
                emergencyContactNumber,
            });
            return res.status(200).json({
                message: "user registered",
                data: users,
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "failed to get register user",
            data: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
exports.register = register;
