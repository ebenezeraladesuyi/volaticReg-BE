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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUnizik = exports.registerUnizik = void 0;
const UnizikTechModel_1 = require("../model/UnizikTechModel");
const registerUnizik = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, phoneNumber } = req.body;
        const checkExist = yield UnizikTechModel_1.unizikModel.findOne({ email });
        if (checkExist) {
            return res.status(500).json({
                message: 'This email has been used'
            });
        }
        else {
            const unizikUser = yield UnizikTechModel_1.unizikModel.create({
                fullName, email, phoneNumber
            });
            return res.status(200).json({
                message: "Registered successfully",
                data: unizikUser,
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            message: "Error while registering",
            data: error
        });
    }
});
exports.registerUnizik = registerUnizik;
const getAllUnizik = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllRegistered = yield UnizikTechModel_1.unizikModel.find();
        return res.status(200).json({
            message: "All registered gotten",
            data: getAllRegistered,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Unable to get all registered",
            data: error,
        });
    }
});
exports.getAllUnizik = getAllUnizik;
