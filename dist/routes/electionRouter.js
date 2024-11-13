"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ElectionController_1 = require("../controller/ElectionController");
const electionRoutes = (0, express_1.Router)();
// Endpoint to retrieve candidates
electionRoutes.get('/candidates', ElectionController_1.getCandidates);
// Endpoint to cast a vote
electionRoutes.post('/vote', ElectionController_1.castVote);
exports.default = electionRoutes;
