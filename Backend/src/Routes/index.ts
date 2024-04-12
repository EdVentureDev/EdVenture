import express  from 'express';
import userRouter from "./user"
import groupRouter from "./groups"

const router = express.Router()

router.use("/user",userRouter)
router.use("/group",groupRouter)

export default router;