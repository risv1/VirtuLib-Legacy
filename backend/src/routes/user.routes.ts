import express, { Request, Response } from "express"
import { createReservation} from "../handlers/reservations";
import { logOut, loginUser, registerUser } from "../handlers/auth";
import { getUserReservedBooks } from "../handlers/users";

const userRouter = express.Router()

userRouter.post("/reservations", createReservation);
userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/logout", logOut)

userRouter.get("/reservations", getUserReservedBooks)
userRouter.get("/login", (req: Request, res: Response) => {
    res.render("login.ejs");
})
userRouter.get("/register", (req: Request, res: Response) => {
    res.render("register.ejs");
})

export default userRouter;