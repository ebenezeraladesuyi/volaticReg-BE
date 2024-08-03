import express, { Application , Request , Response } from "express";
import cors from "cors";
import userRouter from "./routes/UserRouter";
import forexRouter from "./routes/ForexRoutes";


const appConfig = (app: Application) => {
  app.use(express.json()).use(cors());

  //routes
  app.use("/volatic" , userRouter)
  app.use("/forex", forexRouter)

  app.get("/" , (req: Request , res:Response)=>{
    return res.status(200).json({
      message : "default get"
    })
  })
};



export default appConfig