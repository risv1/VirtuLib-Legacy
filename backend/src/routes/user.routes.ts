import express from "express"
import { fetchUser } from "../handlers/users" 
import { createReservation, getUserReservedBooks } from "../handlers/reservations";

const userRouter = express.Router()

userRouter.get("/users/:id", fetchUser) 
userRouter.post("/reservations", createReservation);
userRouter.get("/reservations/:userId", getUserReservedBooks);

export default userRouter;