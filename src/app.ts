import express, { Application , Request , Response } from "express";
import cors from "cors";
import userRouter from "./routes/UserRouter";
import forexRouter from "./routes/ForexRoutes";
import unizikRouter from "./routes/UnizikTechRouter";
import unizikBootRouter from "./routes/UnizikBootRouter";


const appConfig = (app: Application) => {
  app.use(express.json()).use(cors());

  //routes
  app.use("/volatic" , userRouter)
  app.use("/forex", forexRouter)
  app.use("/unizik", unizikRouter)
  app.use("/unizikboot", unizikBootRouter)

  app.get("/" , (req: Request , res:Response)=>{
    return res.status(200).json({
      message : "defaultt get"
    })
  })
};



export default appConfig