import { Router } from "express";
import * as controllers from "../controllers/events.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

// Routes
router.get("/", controllers.getAllEvents);
router.get("/:eventId", controllers.getEventById);
router.post("/", verifyToken, controllers.createEvent);
router.put("/:eventId", verifyToken, controllers.updateEvent);
router.delete("/:eventId", verifyToken, controllers.deleteEvent);

export default router;
