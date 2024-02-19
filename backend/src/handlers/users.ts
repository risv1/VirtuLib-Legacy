import { Request, Response } from "express";
import { ReservationModel } from "../models/reservations";
import { JwtPayload, verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret: string = process.env.JWT_SECRET!;

export const getSession = (req: Request, res: Response) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Missing token" });
    }
    const decoded: string | JwtPayload = verify(token, secret);
    res.status(200).json(decoded);
}

export const fetchUserBooks = (req: Request, res: Response) => {
    return res.json({message: "User's books"});
}

export const getUserReservedBooks = async (req: Request, res: Response) => {
    const userid = req.params.userId;
  
    try {
        const userReservations = await ReservationModel.find({ userid: userid });
        if (userReservations.length === 0) {
            return res.status(404).json({ error: "No reservations found for this user" });
        }
        return res.status(200).json(userReservations);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
  }