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
exports.getAllForex = exports.registerForex = void 0;
const ForexModel_1 = require("../model/ForexModel");
const registerForex = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, phoneNumber } = req.body;
        const checkExist = yield ForexModel_1.forexModel.findOne({ email });
        if (checkExist) {
            return res.status(500).json({
                message: 'This email has been used'
            });
        }
        else {
            const forexUser = yield ForexModel_1.forexModel.create({
                fullName, email, phoneNumber
            });
            return res.status(200).json({
                message: 'Registered successfully',
                data: forexUser,
            });
        }
    }
    catch (error) {
        return res.sendStatus(400).json({
            message: 'Registration failed',
            data: error,
        });
    }
});
exports.registerForex = registerForex;
const getAllForex = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allForex = yield ForexModel_1.forexModel.find();
        return res.status(200).json({
            message: 'All forex fetched successfully',
            data: allForex,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: 'Failed to get all forex',
            data: error
        });
    }
});
exports.getAllForex = getAllForex;
