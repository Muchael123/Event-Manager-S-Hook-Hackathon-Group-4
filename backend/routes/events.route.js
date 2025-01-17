import { Router } from "express";
import GetEvents from "../controllers/getallevents.js";
import EventValidator from "../middlewares/EventValidator.js";
import CreateEvent from "../controllers/CreateEvent.controller.js";
import verifyToken from "../middlewares/VerifyToken.js";
import  GetEventById from "../controllers/geteventbyid.js";
const router = Router()

// get all events
router.get("/", GetEvents )
//get event by id
router.get("/:id", GetEventById)
//create event
router.post("/", verifyToken, EventValidator, CreateEvent)



export default router