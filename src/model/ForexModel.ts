import mongoose from "mongoose";

interface forex {
    fullName: string;
    email: string;
    phoneNumber: string;
}

interface iForex extends forex, mongoose.Document {}

const forexSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "please, enter your fullname"]
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

export const forexModel = mongoose.model<iForex>('allForex', forexSchema)