import express from "express"
import { fetchUser } from "../handlers/users" 

const userRouter = express.Router()

userRouter.get("/users/:id", fetchUser) 

export default userRouter;