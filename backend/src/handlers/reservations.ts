import { Request, Response } from "express";
import { Reservation } from "../models/reservations";
import { v4 as uuidv4 } from "uuid";

const reservations: Reservation[] = [
    {id: "1", userId: "1", bookId: "1", status: "reserved", reservedAt: "2021-01-01"},
    {id: "2", userId: "2", bookId: "2", status: "active", reservedAt: "2021-01-02"},
    {id: "3", userId: "3", bookId: "3", status: "returned", reservedAt: "2021-01-03"},
    {id: "4", userId: "4", bookId: "4", status: "reserved", reservedAt: "2021-01-04"},
    {id: "5", userId: "5", bookId: "5", status: "active", reservedAt: "2021-01-05"},
]

export const createReservation = (req: Request, res: Response) => {
    const { userId, bookId } = req.body;
    const reservation: Reservation = {
        id: uuidv4(),
        userId: userId,
        bookId: bookId,
        status: 'reserved',
        reservedAt: new Date().toISOString().split('T')[0]
    };
    if(!reservation){
        throw new Error("Reservation failed");
    }
    reservations.push(reservation);
    return res.json({message: "Created reservation"});
}

export const getAllReservations = (req: Request, res: Response) => {
    return res.status(200).json(reservations);
};

export const getReservationById = (req: Request, res: Response) => {
    const id = req.params.id;
    const reservation = reservations.find(reservation => reservation.id === id);

    if (!reservation) {
        return res.status(404).json({ error: "Reservation not found" });
    }

    return res.status(200).json(reservation);
};

export const getUserReservedBooks = (req: Request, res: Response) => {
    const userId = req.params.userId;
    const userReservations = reservations.filter(reservation => reservation.userId === userId);

    return res.status(200).json(userReservations);
};