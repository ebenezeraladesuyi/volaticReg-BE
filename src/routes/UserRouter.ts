import express from "express"
import { getAllUsers, getOneUser, register, } from "../controller/UserController"

const userRouter = express.Router()

userRouter.get("/registered" , getAllUsers)
userRouter.get("/registered/:userId" , getOneUser)
userRouter.post("/register", register)


export default userRouter