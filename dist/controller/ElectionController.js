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
exports.getCandidates = exports.castVote = void 0;
const ElectionVoterModel_1 = require("../model/ElectionVoterModel");
const ElectionCandModel_1 = __importDefault(require("../model/ElectionCandModel")); // Candidate import
const mongoose_1 = __importDefault(require("mongoose"));
// Function to cast a vote
const castVote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, ageRange, candidateId } = req.body;
        // Validate candidate ID format (optional but recommended)
        if (!mongoose_1.default.Types.ObjectId.isValid(candidateId)) {
            res.status(400).json({ message: 'Invalid candidate ID format.' });
            return;
        }
        // Check if voter has already voted
        let existingVoter = yield ElectionVoterModel_1.Voter.findOne({ email });
        if (existingVoter && existingVoter.hasVoted) {
            res.status(400).json({ message: 'This email has already voted.' });
            return;
        }
        if (existingVoter) {
            // Update existing voter record if they haven’t voted
            existingVoter.hasVoted = true;
            existingVoter.candidateId = candidateId;
            yield existingVoter.save();
        }
        else {
            // Create new voter record if email is not found
            yield ElectionVoterModel_1.Voter.create({ email, ageRange, hasVoted: true, candidateId });
        }
        // Increment vote count for the selected candidate
        const candidate = yield ElectionCandModel_1.default.findByIdAndUpdate(candidateId, { $inc: { votes: 1 } }, { new: true } // Return the updated candidate
        );
        if (!candidate) {
            // Candidate not found
            res.status(404).json({ message: 'Candidate not found.' });
            return;
        }
        res.status(200).json({ message: 'Vote cast successfully!' });
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred while casting the vote.', error });
    }
});
exports.castVote = castVote;
// Function to get candidates list
const getCandidates = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const candidates = yield ElectionCandModel_1.default.find(); // Get all candidates
        res.status(200).json(candidates); // Return list of candidates
    }
    catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving candidates.', error });
    }
});
exports.getCandidates = getCandidates;
