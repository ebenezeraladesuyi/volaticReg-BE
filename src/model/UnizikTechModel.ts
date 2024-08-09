import mongoose from "mongoose";

interface Unizik {
    fullName: string;
    email: string;
    phoneNumber: string;
}

interface iUnizik extends Unizik, mongoose.Document {}

const unizikSchema = new mongoose.Schema({
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
    }
});

export const unizikModel = mongoose.model<iUnizik>("allUnizik", unizikSchema);
