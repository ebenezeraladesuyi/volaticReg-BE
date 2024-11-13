import mongoose, { Schema, Document } from 'mongoose';

export interface ICandidate extends Document {
  name: string;
  party: string;
  votes: number;
}

const CandidateSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  party: { type: String, required: true },
  votes: { type: Number, default: 0 },
});

// Seed data for each candidate
const Candidate = mongoose.model<ICandidate>('Candidate', CandidateSchema);

// Initialize candidates with default values if not already present in the database
const initializeCandidates = async () => {
  const candidates = [
    { name: 'LUCKY AIYEDATIWA', party: 'APC', votes: 0 },
    { name: 'AGBOOLA AJAYI', party: 'PDP', votes: 0 },
    { name: 'AYODELE FESTUS OLORUNFEMI', party: 'LP', votes: 0 },
    { name: 'OLUGBENGA OMOGBEMI EDEMA', party: 'NNPP', votes: 0 },
  ];

  for (const candidateData of candidates) {
    // Use upsert to insert the candidate if it doesn't exist or skip if it does
    await Candidate.findOneAndUpdate(
      { name: candidateData.name },
      candidateData,
      { upsert: true, new: true }
    );
  }
};

// Call the initialization function (e.g., in your app startup code)
initializeCandidates().catch((error) => {
  console.error('Error initializing candidates:', error);
});

export default Candidate;
