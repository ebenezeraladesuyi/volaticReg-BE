import express from "express"
import { getAllUsers, getOneUser, register, } from "../controller/UserController"

const userRouter = express.Router()

userRouter.get("/" , getAllUsers)
userRouter.get("/:userId" , getOneUser)
userRouter.post("/register", register)


export default userRouter