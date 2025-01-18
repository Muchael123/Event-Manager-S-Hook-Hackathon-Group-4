import { Router } from "express";
import verifyToken from "../middlewares/VerifyToken.js";
import AddTicket  from "../controllers/tickets/AddTicket.js";
import VerifyTicketData from "../middlewares/tickets/VerifyTicketData.js";
import EditTicket from "../controllers/tickets/EditTicket.js";
import ValidateEditTicketData from "../middlewares/tickets/VerifyEditticket.js";
const router = Router();


//add a new ticket
router.post("/", verifyToken,VerifyTicketData, AddTicket);
//edit a ticket
router.patch("/:id",verifyToken, ValidateEditTicketData, EditTicket);
//delete a ticket

//count tickets in a certain event

//get all tickets in a certain event
router.get("/event/:id", (req, res) => {
    res.status(200).json({ message: "Tickets retrieved successfully" });
});

export default router