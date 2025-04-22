import { Router } from "express";
import userRouter from "./user.js";
import eventRouter from "./event.js"; 

const router = Router();

router.get("/", (req, res) => {
  res.send("This is the landing page");
});

router.use("/users", userRouter);
router.use("/events", eventRouter); 

export default router;
