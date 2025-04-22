import { Router } from "express";
import userRouter from "./user.js";

const router = Router();

router.get("/", (req, res)=> {
    res.send("This is the landing page")
})

router.use("/users", userRouter);

export default router;