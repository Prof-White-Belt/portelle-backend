import { Router } from "express";
import * as controllers from "../controllers/users.js"; 
import verifyToken from "../middleware/verifyToken.js"; 

const router = Router();

router.get("/", verifyToken, controllers.getUsers);
router.get("/:userId", verifyToken, controllers.getUser);
router.get("/createdEvents", verifyToken, controllers.showCreatedEvents)
router.get("/interestedEvents", verifyToken, controllers.showInterestedEvents )
router.post("/sign-up", controllers.signUp);
router.post("/sign-in", controllers.signIn);
router.put("/:eventId", verifyToken, controllers.interestedEvent);

export default router;