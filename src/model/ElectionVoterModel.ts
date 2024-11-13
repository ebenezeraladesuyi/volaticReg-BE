import mongoose, { Schema, Document } from 'mongoose';

export interface IVoter extends Document {
  email: string;
  ageRange: string;
  hasVoted: boolean;
  candidateId: mongoose.Types.ObjectId | null;
}

const VoterSchema: Schema = new Schema({
  email: {  
            type: String, 
            required: true, 
            unique: true 
        },
  ageRange: { 
                type: String, 
                required: true 
            },
  hasVoted: { 
                type: Boolean, default: false
            },
  candidateId: { 
                    type: mongoose.Types.ObjectId, 
                    ref: 'Candidate', 
                    default: null 
                },
});

export const Voter = mongoose.model<IVoter>('Voter', VoterSchema);
