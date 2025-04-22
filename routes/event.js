import { Router } from "express";
import * as controllers from "../controllers/events.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

// Routes
router.get("/", controllers.getAllEvents);
router.get("/:id", controllers.getEventById);
router.post("/", verifyToken, controllers.createEvent);
router.put("/:id", verifyToken, controllers.updateEvent);
router.delete("/:id", verifyToken, controllers.deleteEvent);

export default router;
