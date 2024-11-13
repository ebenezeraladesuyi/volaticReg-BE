"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importStar(require("mongoose"));
const CandidateSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    party: { type: String, required: true },
    votes: { type: Number, default: 0 },
});
// Seed data for each candidate
const Candidate = mongoose_1.default.model('Candidate', CandidateSchema);
// Initialize candidates with default values if not already present in the database
const initializeCandidates = () => __awaiter(void 0, void 0, void 0, function* () {
    const candidates = [
        { name: 'LUCKY AIYEDATIWA', party: 'APC', votes: 0 },
        { name: 'AGBOOLA AJAYI', party: 'PDP', votes: 0 },
        { name: 'AYODELE FESTUS OLORUNFEMI', party: 'LP', votes: 0 },
        { name: 'OLUGBENGA OMOGBEMI EDEMA', party: 'NNPP', votes: 0 },
    ];
    for (const candidateData of candidates) {
        // Use upsert to insert the candidate if it doesn't exist or skip if it does
        yield Candidate.findOneAndUpdate({ name: candidateData.name }, candidateData, { upsert: true, new: true });
    }
});
// Call the initialization function (e.g., in your app startup code)
initializeCandidates().catch((error) => {
    console.error('Error initializing candidates:', error);
});
exports.default = Candidate;
