import {Request, Response} from "express";
import { forexModel } from "../model/ForexModel";


export const registerForex = async (req: Request, res: Response) => {
    try {
        const{fullName, email, phoneNumber} = req.body;

        const checkExist= await forexModel.findOne({email})

        if (checkExist) {
            return res.status(500).json({
                message: 'This email has been used'
            })
        } else {
            const forexUser = await forexModel.create({
                fullName, email, phoneNumber
            });

            return res.status(200).json({
                message: 'Registered successfully',
                data: forexUser,
            })
        }
    } catch (error) {
        return res.sendStatus(400).json({
            message: 'Registration failed',
            data: error,
        })
    }
};


export const getAllForex = async (req: Request, res: Response) => {
    try {
        const allForex = await forexModel.find();
        
        return res.status(200).json({
            message: 'All forex fetched successfully',
            data: allForex,
        })
    } catch (error) {
        return res.status(400).json({
            message: 'Failed to get all forex',
            data: error
        })
    }
}
 