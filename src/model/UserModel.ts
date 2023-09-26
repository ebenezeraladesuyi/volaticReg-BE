import mongoose from "mongoose";

interface user {
  firstName: string;
  surname : string;
  email: string;
  phoneNumber: string;
  educationalQualification : string;
  computerExperience : string;
  address: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactNumber: string;
}

interface Iuser extends user, mongoose.Document {}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "please enter your firstname"],
  },
  surname: {
    type: String,
    required: [true, "please enter your surname"],
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
  },
  phoneNumber: {
    type: String,
    required: [true, "please enter your phone number"],
  },
  educationalQualification: {
    type: String,
    required: [true, "please enter your educational qualification"],
  },
  computerExperience: {
    type: String,
    required: [true],
  },
  address: {
    type: String,
    required: [true, "please enter your address"],
  },
  emergencyContactName: {
    type: String,
    required: [true, "please enter your emergency contact name"],
  },
  emergencyContactRelationship: {
    type: String,
    required: [true, "please enter your emergency contact relationship"],
  },
  emergencyContactNumber: {
    type: String,
    required: [true, "please enter your emergency contact number"],
  },
 
});


const UserModel = mongoose.model<Iuser>("AllUsers" , userSchema)

export default UserModel