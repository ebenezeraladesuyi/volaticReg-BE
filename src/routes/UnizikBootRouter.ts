import express from "express";
import { getAllBootUnizik, registerBootUnizik } from "../controller/UnizikBootController";

const unizikBootRouter = express.Router();

unizikBootRouter.post("/registerbootunizik", registerBootUnizik);
unizikBootRouter.get("/getallbootunizik", getAllBootUnizik);

export default unizikBootRouter;

