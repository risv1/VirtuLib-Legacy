import express from "express";
import { createBook, fetchUser, fetchUsers } from "../handlers/admin";
import {
  getAllReservations,
  getReservationById,
} from "../handlers/reservations";
import { getUserReservedBooks } from "../handlers/users";
import { checkUserRole } from "../handlers/auth";

const adminRouter = express.Router();

adminRouter.use("/admin", checkUserRole)

adminRouter.get("/admin/users", fetchUsers);
adminRouter.get("/admin/users/:id", fetchUser); 
adminRouter.get("/admin/reservations/:userId", getUserReservedBooks);
adminRouter.get("/admin/reservations", getAllReservations);
adminRouter.get("/admin/reservation/:id", getReservationById);

adminRouter.post("/admin/books", createBook);

export default adminRouter;
