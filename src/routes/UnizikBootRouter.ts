import express from "express";
import { getAllBootUnizik, registerBootUnizik } from "../controller/UnizikBootController";

const unizikBootRouter = express.Router();

unizikBootRouter.post("/registerunizik", registerBootUnizik);
unizikBootRouter.get("/getallunizik", getAllBootUnizik);

export default unizikBootRouter;

