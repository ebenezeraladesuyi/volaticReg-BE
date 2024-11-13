import express from 'express';
import { castVote, getCandidates } from "../controller/ElectionController";

const electionRoutes= express.Router()

// Endpoint to retrieve candidates
electionRoutes.get('/candidates', getCandidates);

// Endpoint to cast a vote
electionRoutes.post('/vote', castVote);

export default electionRoutes;
