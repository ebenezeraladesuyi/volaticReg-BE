import express from "express";
import { getAllBootUnizik, registerBootUnizik } from "../controller/UnizikBootController";

const unizikBootRouter = express.Router();

unizikBootRouter.post("/registerproject200", registerBootUnizik);
unizikBootRouter.get("/getallproject200", getAllBootUnizik);

export default unizikBootRouter;

