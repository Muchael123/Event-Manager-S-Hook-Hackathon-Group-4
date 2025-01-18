import { Router } from "express";
import GetEvents from "../controllers/event/getallevents.js";
import EventValidator from "../middlewares/EventValidator.js";
import CreateEvent from "../controllers/event/CreateEvent.controller.js";
import verifyToken from "../middlewares/VerifyToken.js";
import  GetEventById from "../controllers/event/geteventbyid.js";
import EditEventValidator from "../middlewares/ValidateEdit.js";
import EditEvent from "../controllers/event/EditEvent.js";
import DeleteEvent from "../controllers/event/deleteEvent.js";

const router = Router()

// get all events
router.get("/", GetEvents )
//get event by id
router.get("/:id", GetEventById)
//create event
router.post("/", verifyToken, EventValidator, CreateEvent)
//edit event
router.patch("/edit", verifyToken,EditEventValidator, EditEvent)

//delete event
router.delete("/:id", verifyToken, DeleteEvent)



export default router