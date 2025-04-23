import express, { Router } from 'express';
import { addToWaitlist, deleteWaitlistEntry, getWaitlistEntries, getWaitlistEntry } from '../controller/WaitlistAcademosController';

const waitlistRouter = Router()

waitlistRouter.post('/addwaitlist', addToWaitlist)
waitlistRouter.get("/getallwaitlist", getWaitlistEntries);
waitlistRouter.get("/getonewaitlist/:id", getWaitlistEntry);
waitlistRouter.delete("/deleteonewaitlist/:id", deleteWaitlistEntry);


export default waitlistRouter