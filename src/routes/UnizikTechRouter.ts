import express from "express";
import { getAllUnizik, registerUnizik } from "../controller/UnizikTechController";

const unizikRouter = express.Router();

unizikRouter.post("/registerunizik", registerUnizik);
unizikRouter.get("/getallunizik", getAllUnizik);

export default unizikRouter;


