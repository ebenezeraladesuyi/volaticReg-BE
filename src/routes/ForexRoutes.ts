import express from "express";
import { getAllForex, registerForex } from "../controller/ForexController";


const forexRouter = express.Router();

forexRouter.post("/registerforex", registerForex);
forexRouter.get("/getforex", getAllForex)


export default forexRouter;

