"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ElectionController_1 = require("../controller/ElectionController");
const electionRoutes = express_1.default.Router();
// Endpoint to retrieve candidates
electionRoutes.get('/candidates', ElectionController_1.getCandidates);
// Endpoint to cast a vote
electionRoutes.post('/vote', ElectionController_1.castVote);
exports.default = electionRoutes;
