import { Request, Response } from "express";
import UserModel from "../model/UserModel";


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();

    return res.status(200).json({
      message: "gotten all users",
      data: users,
    });
  } catch (error) {
    return res.status(400).json({
      message: "failed to get all users",
      data: error,
    });
  }
};


//get one user
export const getOneUser = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.findById(req.params.userId);

    return res.status(200).json({
      message: "gotten one user",
      data: users,
    });
  } catch (error) {
    return res.status(400).json({
      message: "failed to get all users",
      data: error,
    });
  }
};


//register a user
export const register = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      surname,
      email,
      phoneNumber,
      educationalQualification,
      computerExperience,
      emergencyContactName,
      emergencyContactRelationship,
      emergencyContactNumber,
    } = req.body;

    const checkExist = await UserModel.findOne({ email });

    if (checkExist) {
      return res.status(500).json({
        message: "This email has been used",
      });
    } else {

      const users = await UserModel.create({
        firstName,
        surname,
        email,
        phoneNumber,
        educationalQualification,
        computerExperience,
        emergencyContactName,
        emergencyContactRelationship,
        emergencyContactNumber,
      });
  
      return res.status(200).json({
        message: "user registered",
        data: users,
      });
    }
  } catch (error: any) {
    return res.status(400).json({
      message: "failed to get register user",
      data: error?.message,
    });
  }
};


