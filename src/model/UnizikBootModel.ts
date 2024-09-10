import mongoose from "mongoose";

interface UnizikCamp {
    fullName: string;
    email: string;
    phoneNumber: string;
    skill: string;
}

interface iUnizikCamp extends UnizikCamp, mongoose.Document {}

const unizikBootSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "please, enter your full name"]
    },
    email: {
        type: String,
        required: [true, "please, enter your email"]
    },
    phoneNumber: {
        type: String,
        required: [true, "please, enter your phone number"]
    },
    skill: {
        type: String,
        required: [true, "please, select your skill"]
    }
});

export const unizikBootModel = mongoose.model<iUnizikCamp>("allUnizikBoot", unizikBootSchema);
