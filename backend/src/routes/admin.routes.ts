import express from "express"
import { fetchUsers } from "../handlers/admin" 
import { createReservation, getAllReservations, getReservationById, getUserReservedBooks } from "../handlers/reservations"

const adminRouter = express.Router()

adminRouter.get("/admin/users", fetchUsers) 
adminRouter.get("/admin/reservations", getAllReservations) 
adminRouter.get("/admin/reservation/:id", getReservationById)
adminRouter.get("/admin/reservations/:userId", getUserReservedBooks)

adminRouter.post("/admin/reservations", createReservation)

export default adminRouter;