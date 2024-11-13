import { Request, Response } from 'express';
import { Voter, IVoter } from '../model/ElectionVoterModel';
import Candidate from '../model/ElectionCandModel';  // Candidate import
import mongoose from 'mongoose';

// Function to cast a vote
export const castVote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, ageRange, candidateId } = req.body;

    // Validate candidate ID format (optional but recommended)
    if (!mongoose.Types.ObjectId.isValid(candidateId)) {
      res.status(400).json({ message: 'Invalid candidate ID format.' });
      return;
    }

    // Check if voter has already voted
    let existingVoter: IVoter | null = await Voter.findOne({ email });

    if (existingVoter && existingVoter.hasVoted) {
      res.status(400).json({ message: 'This email has already voted.' });
      return;
    }

    if (existingVoter) {
      // Update existing voter record if they haven’t voted
      existingVoter.hasVoted = true;
      existingVoter.candidateId = candidateId;
      await existingVoter.save();
    } else {
      // Create new voter record if email is not found
      await Voter.create({ email, ageRange, hasVoted: true, candidateId });
    }

    // Increment vote count for the selected candidate
    const candidate = await Candidate.findByIdAndUpdate(
      candidateId,
      { $inc: { votes: 1 } },
      { new: true }  // Return the updated candidate
    );

    if (!candidate) {
      // Candidate not found
      res.status(404).json({ message: 'Candidate not found.' });
      return;
    }

    res.status(200).json({ message: 'Vote cast successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while casting the vote.', error });
  }
};

// Function to get candidates list
export const getCandidates = async (_req: Request, res: Response): Promise<void> => {
  try {
    const candidates = await Candidate.find();  // Get all candidates
    res.status(200).json(candidates);  // Return list of candidates
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while retrieving candidates.', error });
  }
};
